import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// Class değil de fonksiyon olarak tanımlı olsaydı aşağıdaki yöntemle
// id alınabilirdi.
// const ProductDetails = () => {
//   // const params = useParams();
//   // console.log(params);
//   const { id } = useParams();

//   return (
//     <div>
//       <h1>Product Details - {id} </h1>
//       {/* <button onClick={this.handleSave}>Save</button> */}
//     </div>
//   );
// };

function withParams(Component) {
  return props => (
    <Component
      {...props}
      params={useParams()}
      // history={createBrowserHistory()}
      navigate={useNavigate()}
    />
  );
}

class ProductDetails extends Component {
  state = {
    id: 0,
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.fetchData(id);
  }

  fetchData = id => {
    this.setState({ id });
  };

  handleSave = navigate => {
    // history.push('/products');
    // console.log(history);

    // Navigate to /products
    navigate('/products');
  };

  render() {
    const { id } = this.state;
    let { navigate } = this.props;
    // let { history, navigate } = this.props;
    // console.log(this.props);

    return (
      <>
        <h1>Product Details - {id} </h1>
        <button
          className='btn btn-primary'
          onClick={() => this.handleSave(navigate)}
        >
          Save
        </button>
      </>
    );
  }
}

export default withParams(ProductDetails);
