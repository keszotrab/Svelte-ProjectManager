import type { Project } from "$lib/project";
import { ProjectService } from "$lib/server/projectService";
import { Story } from "$lib/story";
import { getObjectFromCookie } from "$lib/utils/cookiesUtils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, cookies }) => {
  await parent();
  let layoutData = await parent();
  let currentProject = layoutData.props.currentProject;
  let stories: any[] = [];

  if (!currentProject) {
    return { stories };
  }

  const projectService = new ProjectService();
  let storyInstances = (await projectService.getStories(
    currentProject.id
  )) as Story[];

  stories = storyInstances.map((story) => (
    {
    id: story.id,
    name: story.name,
    desc: story.desc,
    priority: story.priority,
    projectId: story.projectId,
    createDate: story.createDate,
    state: story.state,
    owner: {
      id: story.owner.id,
      name: story.owner.name,
      surname: story.owner.surname,
      role: story.owner.role,
    },
  }));

  return {
    stories: stories,
  };
};
