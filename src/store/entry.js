import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import entryService from "../service/entry.service";
import entrySpecificationService from "../service/entry.service";
// import {
//   createdentrySpecifications,
//   removedentrySpecifications,
// } from "./entrySpecification";

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

export const loadentrys = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await entryService.getAll();
    dispatch(entryRecived(content));
  } catch (error) {
    console.log(error);
    dispatch(requestFailed(error.message));
  }
};

export const createdentry = (payload) => async (dispatch) => {
  dispatch(requested());
  try {
    payload = { ...payload, _id: uuidv4() };
    payload.specifications = await dispatch();
    // createdentrySpecifications(payload)
    const { content } = await entryService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const removedentry = (id) => async (dispatch, getState) => {
  const { entities } = getState().entry;
  dispatch(requested());
  try {
    const item = entities.find((p) => p._id === id);
    // await dispatch(removedentrySpecifications(item));
    await entryService.delete(id);
    dispatch(removed(id));
  } catch (error) {
    dispatch(requestFailed(error.message));
  }
};

export const updatedentry = (payload) => async (dispatch, getState) => {
  const { entities } = getState().entry;
  const entry = entities.find((p) => p._id === payload._id);
  dispatch(requested());
  try {
    console.log("payload", payload);
    console.log("entry", entry);
    if (payload.specifications.length > 0) {
      const newSpecifications = payload.specifications;
      const oldSpecifications = entry?.specifications || [];
      const createdArray = [];
      const updatedArray = [];
      const deletedArray = [];
      newSpecifications.forEach((newS) => {
        const index = oldSpecifications.findIndex((oS) => oS._id === newS._id);
        index !== -1 ? updatedArray.push(newS) : createdArray.push(newS);
      });
      oldSpecifications.forEach((oS) => {
        const index = newSpecifications.findIndex(
          (newS) => newS._id === oS._id
        );
        if (index === -1) deletedArray.push(oS);
      });
      console.log(createdArray, updatedArray, deletedArray);
      if (updatedArray.length > 0) {
        for (let i = 0; i < updatedArray.length; i++) {
          const item = { ...updatedArray[i], _id: uuidv4() };
          const { content } = await entrySpecificationService.update(item);
          console.log("upd content", content);
          payload.specifications[i] = content._id;
        }
      }
      if (createdArray.length > 0) {
        for (let i = 0; i < createdArray.length; i++) {
          const item = { ...createdArray[i], _id: uuidv4() };
          const { content } = await entrySpecificationService.create(item);
          console.log("creat content", content);
          payload.specifications[i] = content._id;
        }
      }
      if (deletedArray.length > 0) {
        // await dispatch(removedentrySpecifications({_id}));
        for (let i = 0; i < deletedArray.length; i++) {
          const item = deletedArray[i];
          await entrySpecificationService.delete(item._id);
        }
      }
    }
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

export const getentryById = (id) => (state) => {
  if (state.entry.entities) {
    return state.entry.entities.find((p) => p._id === id);
  }
};
export const getentrys = () => (state) => state.entry.entities;
export const getentrysLoadingStatus = () => (state) => state.entry.isLoading;

export default entryReducer;
