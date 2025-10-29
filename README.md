# Frontend Code Challenge

As you can see, we have provided a very basic application complaining with most of the requirements described in the [DESCRIPTION.md](./DESCRIPTION.md) file. Still, there are a lot of issues related to different topics: scalability, performance, type checking, naming... In this case, we want to focus our efforts in the following tasks:

1. We are loading around 700 kB of Javascript for rendering each page (production build) and we want to reduce the loaded Javascript of each page as much as possible but keeping all features. Improve the application as much as you know to reach the goal. 

2. We are adding a new pet kind `bird` with the following properties:
```
id: number
name: string
kind: string
weight: number
height: number
length: number
photo_url: string
description: string
num_of_feathers: number
wingspan: number
```

The calculation of the bird's health is being done following this formula:
```
if wingspan / length < 1.5 then unhealthy
if num_of_feathers > 200 then very_healthy
else if num_of_feathers < 100 then unhealthy
else healthy
```

More pet kinds could come in the future with similar requirements. Make the application work with this new pet kind. To develop the feature, you can use this new endpoint with test data: `https://my-json-server.typicode.com/Feverup/fever_pets_data_test/pets`.
