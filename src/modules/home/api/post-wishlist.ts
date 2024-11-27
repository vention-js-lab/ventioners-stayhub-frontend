import { axiosInstance } from '#/configs';

export async function postWishlist(id: string) {
  await axiosInstance.post(`/accommodations/${id}/wishlist`);
}
