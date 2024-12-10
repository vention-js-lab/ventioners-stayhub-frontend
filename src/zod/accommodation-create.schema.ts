import { z } from 'zod';

export const createAccomodationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Please choose a valid non-empty name' })
    .max(125, { message: 'Entered accommodation name is too long' }),

  description: z
    .string()
    .min(1, { message: 'Please choose a valid non-empty description' })
    .max(255, { message: 'Entered description is too long' }),

  location: z
    .string()
    .min(1, { message: 'Please enter a valid non-empty location' })
    .max(200, { message: 'Entered location is too long, are you sure it is the right one?' }),

  pricePerNight: z
    .number({ message: 'Please enter a valid price per night' })
    .positive({ message: 'Please make sure you enter a reasonable price per night' }),

  numberOfGuests: z
    .number()
    .int()
    .nonnegative({ message: 'Please make sure you enter a reasonable number of guests your place can host' }),

  categoryId: z.string().trim().min(1, { message: 'Please select a category that best describes your place' }),

  amenities: z.array(z.string().trim().max(100)).min(1, { message: 'Please select at least one amenity' }),

  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.substring(0, 5) === 'image'),
      { message: 'Invalid image file type' }
    )
    .min(5, { message: 'At least 5 images are required' })
    .max(15, { message: 'At most 15 images can be uploaded' }),

  locationCoordinates: z.object({
    type: z.literal('Point', { message: 'The location type must be "Point"' }),
    coordinates: z
      .tuple([z.number().min(-180).max(180), z.number().min(-90).max(90)])
      .refine(([longitude, latitude]) => longitude >= -180 && longitude <= 180 && latitude >= -90 && latitude <= 90, {
        message: 'Coordinates must be valid longitude and latitude values',
      }),
  }),
});

export type AccommodationFormData = z.infer<typeof createAccomodationSchema>;
