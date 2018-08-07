const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September"
];

const cities = [
   "New York City, NY",
   "San Diego, CA",
   "Los Angeles, CA",
   "Boston, MA",
   "Seattle, WA",
   "Chicago, IL",
   "Houston, TX",
   "Philadelphia, PA",
   "Phoenix, AZ"
];

const meetups = {};

for (let i = 0; i < 9; i++) {
   meetups[`meetup${i}`] = {
      title: `${months[i]} Celebration in ${cities[i]}`,
      location: `${cities[i]}`,
      date: new Date(`2020-0${i + 1}-0${i + 1} ${i + 12}:00`).toISOString(),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Curabitur quis tellus ante. Ut ornare elit et dui cursus, quis rutrum 
      augue faucibus. Donec mi magna, porta at dignissim nec, ultricies a 
      magna. Nam aliquet nibh nulla, id facilisis ligula viverra id. 
      Pellentesque sed sapien orci. Nunc lacinia iaculis molestie. Donec 
      sed tristique lectus. Cras finibus vehicula neque vel consectetur. 
      Nunc lacinia mollis nibh, ut fermentum libero eleifend in. Integer 
      sodales diam ut purus malesuada, sed accumsan felis cursus. 
      Pellentesque eu elementum orci. Etiam pellentesque, quam non venenatis 
      pretium, erat ipsum hendrerit sapien, quis lacinia lorem ligula sit 
      amet ante. Cras eget nisl sollicitudin, rutrum mauris quis, hendrerit 
      metus.`,
      imageURL: null,
      creatorId: null
   };
}

export default meetups;
