class Restaurant extends React.Component {

  constructor(props) {
    super(props);
    let tmpSections = window.data.restaurant.active_menu.menu.item_order;
    this.state = { items: window.data.restaurant.active_menu.menu.items };
    let sections = [];
    for (let i = 0; i < tmpSections.length; i++) sections[i] = this.getSectionItems(tmpSections[i], i);
    this.state = {
      theme: "List",
      searchText: "",
      sections: sections,
    };
  }

  getSectionItems(section, sectionID) {
    for (let i = 0; i < section.items.length; i++) section.items[i] = this.getItemDetails(section.items[i], sectionID, i);
    return section;
  }

  getItemDetails(item, sectionID, i) {
    let idPattern = /\d+/g, id = item.match(idPattern) - 1;
    let details = this.state.items[id].item;
    details.fav = false;
    details.id = i;
    details.sectionID = sectionID;
    return details;
  }

  toggleFavorite(item) {
    let sections = this.state.sections;
    sections[item.sectionID].items[item.id].fav ^= 1;
    this.setState({ sections: sections });
  }

  getHeartButton(item) {
    let theme = this.state.theme, fav = item.fav;
    let imgsrc;
    if (item.fav) imgsrc = "./images/heartf.png";
    else imgsrc = "./images/heart.png";
    if (theme == "Grid") return (
      <button onClick={() => this.toggleFavorite(item)} type="button" className="btn">
        <img src={imgsrc} width="20" height="20" />
      </button>
    )
    else if (theme == "List") return (
      <button onClick={() => this.toggleFavorite(item)} type="button" className="btn btn-outline-secondary mt-auto">
        <img src={imgsrc} className="mr-2" width="16" height="16" />
        {(fav && `Favorilerde`) || (!fav && `Favorilere Ekle`)}
      </button>
    )
  }

  getItemImageSrc(item) {
    if (item.images.length > 0) return item.images[0]["400"];
    else return "";
  }

  printItem(item) {
    let theme = this.state.theme;
    let img = this.getItemImageSrc(item);
    if (theme == "Grid") return (
      <div className="col-sm-6 col-md-3 col-lg-2 mb-2 mt-2">
        <div className="card">
          <div className="pt-2 pl-2 pr-2">
            <img className="rounded card-img-top" src={img} />
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-center text-monospace card-title">{item["name"]}</p>
            {this.getHeartButton(item)}
          </div>
        </div>
      </div>
    )
    else if (theme == "List") return (
      <div className="col-sm-12 col-lg-6 mb-2 mt-2">
        <div className="card">
          <div className="d-flex">
            <div className="card-body row flex-row">
              <div className="col-4">
                <div className=" ">
                  <img className="rounded card-img-top" src={img} />
                </div>
              </div>
              <div className="col-5" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <p className="lead font-bold">{item["name"]}</p>
                <p>
                  <small className="font-italic text-muted">{item["ingredients"].join(", ")}</small>
                </p>
              </div>
              <div className="col-3 d-flex">
                <div />
                <div className="ml-auto d-flex flex-column">
                  <p className="text-right text-success font-weight-bold text-monospace">{item["price"]} TL</p>
                  {this.getHeartButton(item)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

  printSections(section) {
    return (
      <div>
        <h2>{section.section}</h2>
        <div className="row">
          {section.items.map(i => (this.printItem(i)))}
        </div>
      </div>
    )
  }

  getItemLists() {
    let sections = this.search(this.state.searchText);

    return sections.map(section => (section.items.length > 0 && this.printSections(section)))
  }

  search(str) {
    let sections = JSON.parse(JSON.stringify(this.state.sections));
    for (let i = 0; i < sections.length; i++) sections[i].items = sections[i].items.filter(i => i["name"].toLowerCase().includes(str.toLowerCase()));

    if (str === "") return sections;
    return sections;
  }

  getSearch() {
    return (
      <form>
        <div className="mb-3 form-group">
          <label htmlFor="search">Arama Yap</label>
          <input onChange={e => this.setState({ searchText: e.target.value })}
            id="search"
            type="text"
            className="form-control"
            placeholder="Yemek Adına Göre"
            aria-label="search"
            aria-describedby="basic-addon2" />
        </div>
      </form>
    )
  }

  changeTheme(theme) {
    if (theme == "Grid") this.setState({ theme: "Grid" });
    else if (theme == "List") this.setState({ theme: "List" });
  }

  getThemeButtons() {
    return (
      <div className="row">
        <div className="col-2" />
        <div className="btn-group col-8">
          <label onClick={() => this.changeTheme("List")} className={`btn btn-secondary ${this.state.theme == 'List' && 'active'}`}>
            List
          </label>
          <label onClick={() => this.changeTheme("Grid")} className={`btn btn-secondary ${this.state.theme == 'Grid' && 'active'}`}>
            Grid
          </label>
        </div>
        <div className="col-2" />
      </div>
    )
  }

  render() {
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
