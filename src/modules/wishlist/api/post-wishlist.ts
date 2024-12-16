import { api } from '#/configs';

export async function postWishlist(id: string | undefined) {
  await api.post(`/accommodations/${id}/wishlist`);
}
