import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { api } from '#/configs';
import { type AxiosError } from 'axios';
import { type CreateStripeCheckout, type CreateStripeCheckoutAxiosResponse } from '#/modules/home/types/payments';
import { useNavigate } from 'react-router-dom';

export const useCreatePaymentStripeCheckout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: CreateStripeCheckout) => {
      const response = await api.post<CreateStripeCheckoutAxiosResponse>(`${ENDPOINTS.payments}/stripe-checkout`, data);
      return response.data.data;
    },
    onSuccess: (checkoutSessionUrl: string) => {
      navigate(`${checkoutSessionUrl}`);
    },
    onError: (error: AxiosError) => {
      toast.error(`Error creating booking: ${error.message}`);
    },
  });
};
