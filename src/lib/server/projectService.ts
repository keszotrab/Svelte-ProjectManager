import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { Project } from "../project";
import { Story, Priority, State } from "../story";
import { Task } from "../tasks";
import { User, Role } from "../user";
import { UserService } from "../userService";
import { db } from "./firebase";

export class ProjectService {
  //userService: UserService; //Serwis w przyszłości do kosza

  private projectsRef = collection(db, "projects");

  //projects?: Project[];
  //stories?: Story[];
  //tasks?: Task[];

  currentProject?: Project | undefined | null;

  constructor() {
    //probably completyl not needed
  }

  /*
  //
  Project CRUD Functions
  //
  */

  async getProjects(): Promise<Project[]> {
    const querySnapshot = await getDocs(this.projectsRef);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Project
    );
  }

  async createProject(name: string, description: string): Promise<Project> {
    const docRef = await addDoc(this.projectsRef, {
      name,
      description,
    });
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }

  async getProjectById(id: string): Promise<Project | null> {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } else {
      return null;
    }
  }

  async updateProject(
    id: string,
    name: string,
    description?: string
  ): Promise<Project | null> {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, { name, description });
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } else {
      return null;
    }
  }

  async deleteProject(id: string): Promise<void> {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
  }

  /*
  //
  Stories CRUD Functions
  //
  */

  async getStories(projectId: string): Promise<Story[]> {
    const storiesCollection = collection(db, `projects/${projectId}/stories`);
    const storiesSnapshot = await getDocs(storiesCollection);

    return storiesSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Mapowanie danych z Firestore na obiekt Story
      return new Story(
        doc.id,
        data.name,
        data.desc,
        data.priority as Priority,
        projectId, // Bezpośrednie przypisanie projectId zamiast obiektu Project
        data.createDate.toDate(),
        data.state as State,
        {
          id: data.owner.id,
          name: data.owner.name,
          surname: data.owner.surname,
          role: data.owner.role,
        } as User
      );
    });
  }

  async getStory(projectId: string, storyId: string): Promise<Story> {
    const storyDoc = doc(db, `projects/${projectId}/stories`, storyId);
    const storySnapshot = await getDoc(storyDoc);
    if (storySnapshot.exists()) {
      const data = storySnapshot.data();
      return new Story(
        storySnapshot.id,
        data.name,
        data.desc,
        data.priority as Priority,
        projectId, // Bezpośrednie przypisanie projectId zamiast obiektu Project
        data.createDate.toDate(),
        data.state as State,
        {
          id: data.owner.id,
          name: data.owner.name,
          surname: data.owner.surname,
          role: data.owner.role,
        } as User
      );
    } else {
      throw new Error("Story not found");
    }
  }

  async createStory(
    projectId: string,
    name: string,
    desc: string,
    priority: Priority,
    owner: User
  ): Promise<Story> {
    const storiesCollection = collection(db, `projects/${projectId}/stories`);
    const newStoryRef = await addDoc(storiesCollection, {
      name,
      desc,
      priority,
      owner: {
        id: owner.id,
        name: owner.name,
        surname: owner.surname,
        role: owner.role,
      },
      createDate: new Date(),
      state: State.Todo,
    });
    const newStorySnapshot = await getDoc(newStoryRef);
    return new Story(
      newStoryRef.id,
      name,
      desc,
      priority,
      projectId, // Bezpośrednie przypisanie projectId zamiast obiektu Project
      new Date(),
      State.Todo,
      owner
    );
  }

  async updateStory(
    projectId: string,
    storyId: string,
    name?: string,
    desc?: string,
    priority?: Priority,
    state?: State,
    owner?: User,
    date?: Date
  ): Promise<Story> {
    const storyDoc = doc(db, `projects/${projectId}/stories`, storyId);

    const updateData: { [key: string]: any } = {};

    if (name !== undefined) updateData.name = name;
    if (desc !== undefined) updateData.desc = desc;
    if (priority !== undefined) updateData.priority = priority;
    if (state !== undefined) updateData.state = state;
    if (owner !== undefined)
      updateData.owner = {
        id: owner.id,
        name: owner.name,
        surname: owner.surname,
        role: owner.role,
      };
    if (date !== undefined) updateData.createDate = date;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(storyDoc, updateData);
    }

    const updatedStorySnapshot = await getDoc(storyDoc);
    const data = updatedStorySnapshot.data() as DocumentData;

    return new Story(
      storyId,
      data.name,
      data.desc,
      data.priority as Priority,
      projectId,
      data.createDate.toDate(),
      data.state as State,
      {
        id: data.owner.id,
        name: data.owner.name,
        surname: data.owner.surname,
        role: data.owner.role,
      } as User
    );
  }

  async deleteStory(projectId: string, storyId: string): Promise<void> {
    const storyDoc = doc(db, `projects/${projectId}/stories`, storyId);
    await deleteDoc(storyDoc);
  }

  /*
  //
  Task CRUD Functions
  //
  */

  async getTasks(projectId: string, storyId: string): Promise<Task[]> {
    const tasksCollection = collection(db, `projects/${projectId}/stories/${storyId}/tasks`);
    const tasksSnapshot = await getDocs(tasksCollection);

    return tasksSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Mapowanie danych z Firestore na obiekt Story
      return new Task(
        doc.id,
        data.name,
        data.desc,
        data.priority as Priority,
        storyId, // Bezpośrednie przypisanie projectId zamiast obiektu Project
        data.aproxTime.toDate(),
        data.state as State,
        data.createDate.toDate(),
        data.startDate.toDate(),
        data.completeDate.toDate(),
        {
          id: data.owner.id,
          name: data.owner.name,
          surname: data.owner.surname,
          role: data.owner.role,
        } as User
      );
    });
  }



}
