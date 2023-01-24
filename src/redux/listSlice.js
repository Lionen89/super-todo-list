import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { name: 'Backlog', id: 0 },
    { name: 'To Do', id: 1 },
    { name: 'Done', id: 2 },
  ],
};

function findIndex(arr, currentListId) {
  let index = 0;
  index = arr.findIndex((i) => i.id == currentListId);
  return index;
}
const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList(state, action) {
      state.list.unshift({ name: action.payload, id: state.list.length + 1 });
    },
    addTask(state, action) {
      const index = findIndex(state.list, action.payload.currentListId);
      let numbers;
      const arr = state.list.map((element) => {
        numbers =
          element.taskList != null
            ? Math.max(
                ...element.taskList.map((i) => {
                  return i.id;
                }),
              )
            : 0;
        return numbers;
      });
      let newId = Math.max(...arr);

      if (state.list[index].taskList === undefined) {
        state.list[index].taskList = [
          {
            task: action.payload.task,
            description: action.payload.description,
            id: newId + 1,
          },
        ];
      } else
        state.list[index].taskList = [
          ...state.list[index].taskList,
          {
            task: action.payload.task,
            description: action.payload.description,
            id: newId + 1,
          },
        ];
    },
    removeTask(state, action) {
      const listIndex = findIndex(state.list, action.payload.selectedListId);
      const taskIndex = findIndex(state.list[listIndex].taskList, action.payload.selectedTaskId);
      state.list[listIndex].taskList.splice(taskIndex, 1);
    },
    removeList(state, action) {
      const index = findIndex(state.list, action.payload);
      state.list.splice(index, 1);
    },

    dragTask(state, action) {
      const listIndex = findIndex(state.list, action.payload.list.id);
      const taskDropIndex =
        action.payload.task == null
          ? -1
          : findIndex(state.list[listIndex].taskList, action.payload.task.id);
      console.log('action.payload.list.taskList', action.payload.list.taskList);
      console.log('action.payload.dragtTask', action.payload.dragtTask);

      state.list[listIndex].taskList == null
        ? (state.list[listIndex].taskList = [
            {
              task: action.payload.dragtTask.task,
              description: action.payload.dragtTask.description,
              id: action.payload.dragtTask.id,
            },
          ])
        : state.list[listIndex].taskList.splice(
            taskDropIndex < 0 ? state.list[listIndex].taskList.length + 1 : taskDropIndex + 1,
            0,
            action.payload.dragtTask,
          );
      console.log(state.list[listIndex].taskList);
    },
  },
});
export default listSlice.reducer;
export const { addList, addTask, removeTask, removeList, dragTask } = listSlice.actions;
