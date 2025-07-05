import {
  CLEAR_SECTION_ITEM,
  GET_SECTION_ITEM,
  SECTION_FETCH,
  SECTION_ITEM_UPDATE,
  UPDATE_SECTION_AMOUNT,
} from "../constants/sectionsConstans";
import newData from "../util/data";

const initialState = {
  sections: newData?.data?.sections || [],
  sectionItem: [],
};

function sectionReducer(state = initialState, action) {
  switch (action?.type) {
    case SECTION_FETCH:
      return {
        ...state,
        sections: action.payload,
      };

      break;
    case GET_SECTION_ITEM:
      console.log("actionactionaction :>> ", action);
      const selectedSection = state.sections.find(
        (section) => section.section_id === action?.payload
      );
      {
        return {
          ...state,
          sectionItem: selectedSection?.items,
        };
      }
      break;

    case SECTION_ITEM_UPDATE:
      {
        const newForm = action?.payload?.form;

        const data = state?.sections?.map((v) =>
          v.section_id === action?.payload?.sectionId
            ? {
                ...v,
                items: v.items?.map((item) =>
                  item?.item_id === newForm?.item_id
                    ? { ...item, ...newForm }
                    : item
                ),
              }
            : v
        );
        const updateItem =
          data.find((sec) => sec.section_id === action?.payload?.sectionId)
            ?.items || [];

        return { ...state, sections: data, sectionItem: updateItem };
      }
      break;

    case CLEAR_SECTION_ITEM:
      return {
        ...state,
        sectionItem: [],
      };

    case UPDATE_SECTION_AMOUNT: {
      const updateAmoutSection = state?.sections?.map((v) =>
        v.section_id === action?.payload?.sectionId
          ? {
              ...v,
              markup_items_total: action?.payload?.totalAmount,
            }
          : v
      );
      return {
        ...state,
        sections: updateAmoutSection,
      };
    }
    default:
      return state;
  }
}

export default sectionReducer;
