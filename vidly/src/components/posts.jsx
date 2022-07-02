import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Posts = () => {
  const { year, month } = useParams();
  // const params = useParams();
  // yukarıdaki iki yöntem de oluyor...

  const { search } = useLocation();
  const { sortBy, approved } = queryString.parse(search);
  //objedeki tüm parametreler STRING olacaktır. Ona göre DİKKAT EDİLMELİDİR...

  return (
    <div>
      <h1>Posts</h1>
      Year: {year} , Month: {month} <br />
      <br />
      Query String = {search} <br />
      Search Parameters, sortBy = {sortBy}, Approved = {approved}
      {/* Year: {params.year} , Month: {params.month}*/}
    </div>
  );
};

export default Posts;
