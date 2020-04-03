class Restaurant extends React.Component {

  printItem(item) {
    let idPattern = /\d+/g;
    let id = item.match(idPattern) - 1;
    let items = window.data.restaurant.active_menu.menu.items;
    let data = items[id].item;
    return (
      <a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex bd-highlight">
          <div class="flex-grow-1">
            <h5>{data["name"]}</h5>
          </div>
          <div>
            <small>{data["price"]}</small>
          </div>
        </div>
        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        <small>Donec id elit non mi porta.</small>
      </a>
    )
  }

  printSections(item) {
    return (
      <div>
        <h3>{item.section}</h3>
        <div class="list-group">
          {item.items.map(i => (this.printItem(i)))}
        </div>
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
