import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { name: 'Backlog', id: 1 },
    { name: 'To Do', id: 2 },
    { name: 'Done', id: 3 },
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
    addTaskList(state, action) {
      const index = findIndex(state.list, action.payload.currentListId);

      if (state.list[index].taskList === undefined) {
        state.list[index].taskList = [
          {
            task: action.payload.task,
            description: action.payload.description,
            id: 0,
          },
        ];
      } else
        state.list[index].taskList = [
          ...state.list[index].taskList,
          {
            task: action.payload.task,
            description: action.payload.description,
            id: state.list[index].taskList.length + 1,
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
  },
});
export default listSlice.reducer;
export const { addList, addTaskList, removeTask, removeList } = listSlice.actions;
