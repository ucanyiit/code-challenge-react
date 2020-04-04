class Restaurant extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { theme: "List" };
}

  printItem(item) {
    let idPattern = /\d+/g;
    let id = item.match(idPattern) - 1;
    let items = window.data.restaurant.active_menu.menu.items;
    let data = items[id].item;
    let img;

    if (data.images.length > 0) img = data.images[0]["200"];
    else img = "";

    if (this.state.theme=="Grid") return (
      <div className="col-sm-6 col-md-3 col-lg-2">
        <div class="card mb-2 mt-2">
          <div className="pt-3 pl-3 pr-3">
            <img className="rounded card-img-top" src={img} />
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <p class="text-center text-monospace card-title">{data["name"]}</p>
            <button type="button" className="btn">
              <img src="./images/heart.png" className="mr-2" width="20" height="20" />
            </button>
          </div>
        </div>
      </div>
    )
    else return (
      <div className="col-sm-12 col-lg-6">
        <div className="card mb-2 mt-2">
          <div className="d-flex">
            <div className="pl-3 pt-3 pb-3">
              <img className="rounded" src={img} />
            </div>
            <div className="card-body row flex-row">
              <div className="col-7">
                <h5>{data["name"]}</h5>
                <small className="mb-1">{data["ingredients"].join(", ")}</small>
              </div>
              <div className="col-5 d-flex">
                <div />
                <div className="ml-auto d-flex flex-column">
                  <p className="text-right text-success font-weight-bold text-monospace">{data["price"]} TL</p>
                  <button type="button" className="btn btn-outline-secondary mt-auto">
                    <img src="./images/heart.png" className="mr-2" width="20" height="20" />
                    Favorilere ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

  printSections(item) {
    return (
      <div>
        <h2>{item.section}</h2>
        <div className="row">
          {item.items.map(i => (this.printItem(i)))}
        </div>
      </div>
    )
  }

  getItemLists() {
    let sections = window.data.restaurant.active_menu.menu.item_order;

    return sections.map(section => (this.printSections(section)))
  }


  getSearch() {
    return (
      <form>
        <div class="mb-3 form-group">
          <label for="search">Arama Yap</label>
          <input id="search" type="text" class="form-control" placeholder="Yemek Adına Göre" aria-label="search" aria-describedby="basic-addon2" />
        </div>
      </form>
    )
  }

  changeTheme(theme) {
    if(theme=="Grid"){
      console.log("Theme changed: Grid")
      this.setState({theme: "Grid"});
    }
    else if(theme=="List"){
      console.log("Theme changed: List")
      this.setState({theme: "List"});
    }
  }

  getThemeButtons() {
    return (
      <div className="row">
        <div className="col-2" />
        <div className="btn-group col-8">
          <label onClick={() => this.changeTheme("List")} className={`btn btn-secondary ${this.state.theme=='List' && 'active'}`}>
            List
          </label>
          <label onClick={() => this.changeTheme("Grid")} className={`btn btn-secondary ${this.state.theme=='List' && 'active'}`}>
          </label>
        </div>
        <div className="col-2" />
      </div>
    )
  }

  render() {
    const restaurant = window.data.restaurant;
    console.log(window.data);
    return (
      <div className="w-100">
        {this.getSearch()}
        {this.getThemeButtons()}
        {this.getItemLists()}
      </div>
    )
  }
}


$(function () {
  ReactDOM.render(
    <Restaurant />,
    document.getElementById('react-root')
  );

})
