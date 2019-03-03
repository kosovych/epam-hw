const listOfPosts1 = [{
  id: 1,
  post: 'some post1',
  title: 'title 1',
  author: 'Ivanov',
  comments: [{
    id: 1.1,
    comment: 'some comment1',
    title: 'title 1',
    author: 'Rimus',
  },
  {
    id: 1.2,
    comment: 'some comment2',
    title: 'title 2',
    author: 'Uncle',
  },
  ],
},
{
  id: 2,
  post: 'some post2',
  title: 'title 2',
  author: 'Ivanov',
  comments: [{
    id: 1.1,
    comment: 'some comment1',
    title: 'title 1',
    author: 'Rimus',
  },
  {
    id: 1.2,
    comment: 'some comment2',
    title: 'title 2',
    author: 'Uncle',
  },
  {
    id: 1.3,
    comment: 'some comment3',
    title: 'title 3',
    author: 'Rimus',
  },
  ],
},
{
  id: 3,
  post: 'some post3',
  title: 'title 3',
  author: 'Rimus',
},
{
  id: 4,
  post: 'some post4',
  title: 'title 4',

  author: 'Uncle',
},
];

function getQuntityPostsByAuthor(listOfPosts, userName) {
  const postAmount = listOfPosts.reduce((postAmount, post) => {
    return post.author === userName ? ++postAmount : postAmount;
  }, 0);

  let commentAmount = 0;
  listOfPosts.map((post) => {
    if (post.comments) {
      post.comments.map((comment) => {
        if (comment.author === userName) {
          return ++commentAmount;
        }
      });
    }
  }, 0);

  return `result => post - ${postAmount}, comments ${commentAmount}`;
}


console.log(getQuntityPostsByAuthor(listOfPosts1, 'Rimus'));
