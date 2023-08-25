import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import entryService from "../service/entry.service";

const initialState = {
  entities: [],
  isLoading: true,
};

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true;
    },
    entryRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    requestFailed(state) {
      state.isLoading = false;
    },
    created(state, action) {
      state.entities = [...state.entities, action.payload];
      state.isLoading = false;
    },
    updated(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el._id === action.payload._id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
      state.isLoading = false;
    },
    removed(state, action) {
      state.entities = state.entities.filter((el) => el._id !== action.payload);
      state.isLoading = false;
    },
  },
});
const { actions, reducer: entryReducer } = entrySlice;
const { entryRecived, requested, created, requestFailed, updated, removed } =
  actions;

export const loadEntries = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await entryService.getAll();
    dispatch(entryRecived(content));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};

export const createdEntry = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    payload = { ...payload, _id: uuidv4() };
    const { content } = await entryService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const removedentry = (id) => async (dispatch, getState) => {
  // const { entities } = getState().entry;
  dispatch(requested());
  try {
    // const item = entities.find((p) => p._id === id);
    // await dispatch(removedentrySpecifications(item));
    await entryService.delete(id);
    dispatch(removed(id));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const updatedentry = (payload) => async (dispatch, getState) => {
  dispatch(requested());
  try {
    const { content } = await entryService.update(payload);
    dispatch(updated(content));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};
export function removeentry(id) {
  return removed({ id });
}

export const getEntryById = (id) => (state) => {
  if (state.entry.entities) {
    return state.entry.entities.find((p) => p._id === id);
  }
};
export const getEntries = () => (state) => state.entry.entities;
export const getEntriesLoadingStatus = () => (state) => state.entry.isLoading;

export default entryReducer;
