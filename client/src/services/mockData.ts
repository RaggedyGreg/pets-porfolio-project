import { Pet } from '../interfaces/interfaces';

/**
 * Mock pet data for development and deployment
 * This simulates the API response until a real backend is implemented
 */
export const mockPets: Pet[] = [
  {
    id: 1,
    name: "Max",
    kind: "dog",
    weight: 25000,
    height: 60,
    length: 90,
    photo_url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    description: "A friendly and energetic golden retriever who loves to play fetch and swim."
  },
  {
    id: 2,
    name: "Luna",
    kind: "cat",
    weight: 4500,
    height: 25,
    length: 45,
    photo_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    description: "An elegant grey tabby with striking green eyes. Very independent but affectionate.",
    number_of_lives: 7
  },
  {
    id: 3,
    name: "Charlie",
    kind: "dog",
    weight: 30000,
    height: 65,
    length: 95,
    photo_url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
    description: "A loyal German Shepherd with excellent training and protective instincts."
  },
  {
    id: 4,
    name: "Bella",
    kind: "cat",
    weight: 3800,
    height: 23,
    length: 40,
    photo_url: "https://images.unsplash.com/photo-1573865526739-10c1dd7e99e2?w=400",
    description: "A playful Siamese cat who enjoys climbing and interactive toys.",
    number_of_lives: 9
  },
  {
    id: 5,
    name: "Tweety",
    kind: "bird",
    weight: 150,
    height: 15,
    length: 20,
    photo_url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
    description: "A cheerful canary with a beautiful yellow plumage and melodious song.",
    num_of_feathers: 2500,
    wingspan: 25
  },
  {
    id: 6,
    name: "Rocky",
    kind: "dog",
    weight: 35000,
    height: 70,
    length: 100,
    photo_url: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400",
    description: "A strong and athletic boxer with boundless energy and a gentle temperament."
  },
  {
    id: 7,
    name: "Whiskers",
    kind: "cat",
    weight: 5200,
    height: 28,
    length: 48,
    photo_url: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400",
    description: "A fluffy Persian cat with long fur and a calm, relaxed personality.",
    number_of_lives: 8
  },
  {
    id: 8,
    name: "Blue",
    kind: "bird",
    weight: 180,
    height: 18,
    length: 22,
    photo_url: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400",
    description: "A vibrant blue budgie who loves to mimic sounds and play with mirrors.",
    num_of_feathers: 3000,
    wingspan: 28
  },
  {
    id: 9,
    name: "Buddy",
    kind: "dog",
    weight: 22000,
    height: 55,
    length: 85,
    photo_url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
    description: "A smart border collie who excels at agility training and herding."
  },
  {
    id: 10,
    name: "Mittens",
    kind: "cat",
    weight: 4200,
    height: 24,
    length: 42,
    photo_url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400",
    description: "A tuxedo cat with distinctive white paws and a friendly, social nature.",
    number_of_lives: 9
  },
  {
    id: 11,
    name: "Kiwi",
    kind: "bird",
    weight: 95,
    height: 12,
    length: 15,
    photo_url: "https://images.unsplash.com/photo-1581985673473-0784a7a44e39?w=400",
    description: "A small green parakeet with a curious personality and love for treats.",
    num_of_feathers: 1800,
    wingspan: 20
  },
  {
    id: 12,
    name: "Daisy",
    kind: "dog",
    weight: 18000,
    height: 50,
    length: 75,
    photo_url: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400",
    description: "A sweet beagle with an incredible sense of smell and adventurous spirit."
  },
  {
    id: 13,
    name: "Shadow",
    kind: "cat",
    weight: 5500,
    height: 30,
    length: 50,
    photo_url: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
    description: "A mysterious black cat who prefers nighttime activities and quiet corners.",
    number_of_lives: 6
  },
  {
    id: 14,
    name: "Rio",
    kind: "bird",
    weight: 320,
    height: 25,
    length: 35,
    photo_url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
    description: "A colorful macaw with striking red and blue feathers and impressive vocabulary.",
    num_of_feathers: 5000,
    wingspan: 50
  },
  {
    id: 15,
    name: "Duke",
    kind: "dog",
    weight: 40000,
    height: 75,
    length: 110,
    photo_url: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    description: "A majestic Great Dane with a gentle giant personality and regal appearance."
  },
  {
    id: 16,
    name: "Ginger",
    kind: "cat",
    weight: 3900,
    height: 22,
    length: 41,
    photo_url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    description: "An orange tabby with a mischievous streak and love for sunny windowsills.",
    number_of_lives: 8
  },
  {
    id: 17,
    name: "Sunny",
    kind: "bird",
    weight: 140,
    height: 14,
    length: 18,
    photo_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    description: "A bright yellow finch with a cheerful disposition and lovely singing voice.",
    num_of_feathers: 2200,
    wingspan: 23
  },
  {
    id: 18,
    name: "Zeus",
    kind: "dog",
    weight: 32000,
    height: 68,
    length: 98,
    photo_url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400",
    description: "A powerful Rottweiler with strong protective instincts and unwavering loyalty."
  },
  {
    id: 19,
    name: "Cleo",
    kind: "cat",
    weight: 4100,
    height: 26,
    length: 44,
    photo_url: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400",
    description: "A graceful Russian Blue with soft grey fur and an intelligent, observant nature.",
    number_of_lives: 9
  },
  {
    id: 20,
    name: "Pepper",
    kind: "bird",
    weight: 110,
    height: 13,
    length: 16,
    photo_url: "https://images.unsplash.com/photo-1571802374470-cbac3e4eeac9?w=400",
    description: "A speckled sparrow who enjoys birdwatching from the safety of indoor perches.",
    num_of_feathers: 1900,
    wingspan: 21
  }
];

/**
 * Get total count of pets
 */
export const getTotalPetCount = (): number => {
  return mockPets.length;
};

/**
 * Get a pet by ID
 */
export const getPetById = (id: number): Pet | undefined => {
  return mockPets.find(pet => pet.id === id);
};

/**
 * Get paginated and sorted pets
 */
export const getPaginatedPets = (
  page: number,
  limit: number,
  sortField?: string,
  sortOrder?: 'asc' | 'desc' | 'ASC' | 'DESC'
): { data: Pet[], total: number } => {
  let sortedPets = [...mockPets];

  // Apply sorting if specified
  if (sortField && sortOrder) {
    const order = sortOrder.toLowerCase() as 'asc' | 'desc';
    sortedPets.sort((a, b) => {
      const aValue = a[sortField as keyof Pet];
      const bValue = b[sortField as keyof Pet];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }

  // Apply pagination
  const start = page * limit;
  const end = start + limit;
  const paginatedData = sortedPets.slice(start, end);

  return {
    data: paginatedData,
    total: sortedPets.length
  };
};
