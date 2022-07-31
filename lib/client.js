import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'll87lm8o',
    dataset: 'production',
    apiVersion: '2022-07-16',
    useCdn: true,
    token: 'skZzcKt0NeYpjxCdX5UvgsBpZM3Rj3MAYyjdTRrrJ3Aeh1jFErhzNuOc9FcYzmXotzPJTeg0jsDfIh8R6qIl12k52DD6R3gdbL8RIjlxWRkRMkund8rbjyCz9LVu7sBwn7UTmOMbHPHLNJNtQwebf7F0m3YuWHs6IgBI7uAmE5j3YI8OZH8K'
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)