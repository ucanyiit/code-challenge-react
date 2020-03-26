class Restaurant extends React.Component {
  render() {
    const restaurant = window.data.restaurant;
    return <div>
    <h1>Welcome to {restaurant.name}</h1>
    <div>
      <h2>
        Please find our menu below
      </h2>
    </div>
    </div>
  }
}


$(function() {
  ReactDOM.render(
    <Restaurant/>,
    document.getElementById('react-root')
  );

})
