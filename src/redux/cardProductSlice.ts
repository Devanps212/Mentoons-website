import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductDetail } from "@/components/MentoonsStore/ProductCard";
import axios from "axios";
const initialState: {
  loading: boolean;
  error: string | null;
  success: boolean;
  cardProducts: ProductDetail[];
} = {
  loading: false,
  error: null,
  success: false,
  cardProducts: [],
};

export const getAllProducts = createAsyncThunk(
  "cardProdcut/getAllProdcut",
  async (val: { search: string; filtercategory: string }) => {
    console.log("ThunkAction", val);
    try {
      const response = await axios.get(
        // "https://mentoons-backend-zlx3.onrender.com/api/v1/sku",
        "https://api.mentoons.com/api/v1/sku",
        {
          headers: {
            "Content-Type": "application/json",
          },

          params: {
            ...(val.search && { search: val.search }),
            page: 1,
            limit: 10,
            ...(val.filtercategory && {
              filter: { ageFilter: val.filtercategory },
            }),
          },
        }
      );
      console.log("ThuckActionResult", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch all the product");
    }
  }
);

const cardProductSlice = createSlice({
  name: "cardProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.cardProducts = action.payload?.data?.allproduct;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
  },
});

export default cardProductSlice.reducer;
