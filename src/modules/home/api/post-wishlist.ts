import { api } from '#/configs';

export async function postWishlist(id: string) {
  await api.post(`/accommodations/${id}/wishlist`);
}
