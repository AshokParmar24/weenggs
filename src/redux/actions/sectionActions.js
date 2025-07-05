import { type } from "@testing-library/user-event/dist/type";
import {
  CLEAR_SECTION_ITEM,
  GET_SECTION_ITEM,
  SECTION_ITEM_UPDATE,
  UPDATE_SECTION_AMOUNT,
} from "../constants/sectionsConstans";

export const updateSectionItem = (data) => ({
  type: SECTION_ITEM_UPDATE,
  payload: data,
});

export const clearSectionItem = (data) => ({
  type: CLEAR_SECTION_ITEM,
  payload: [],
});

export const getSetctionItem = (data) => ({
  type: GET_SECTION_ITEM,
  payload: data,
});

export const updateSectionAmount = (data) => ({
  type: UPDATE_SECTION_AMOUNT,
  payload: data,
});
