class Restaurant extends React.Component {

  printItem(item){
    let idPattern = /\d+/g;
    let id = item.match(idPattern)-1;
    let items = window.data.restaurant.active_menu.menu.items;
    return (
      <li>
        {items[id].item["name"]}
      </li>
    )
  }

  printSections(item) {
    return (
      <div>
        <h3>{item.section}</h3>
        <ul>  
          {item.items.map(i => (this.printItem(i)))}
        </ul>
      </div>
    )
}

  getItemLists() {
    let sections = window.data.restaurant.active_menu.menu.item_order;

    return sections.map(section => (this.printSections(section)))
  }

  render() {
    const restaurant = window.data.restaurant;
    console.log(window.data);
    return this.getItemLists()
  }
}


$(function () {
  ReactDOM.render(
    <Restaurant />,
    document.getElementById('react-root')
  );

})
