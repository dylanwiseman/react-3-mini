import React, { Component } from "react";
import logo from "./mainStreetAuto.svg";
import axios from "axios";
import "./App.css";

// Toast notification dependencies
import { ToastContainer, toast } from "react-toastify";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehiclesToDisplay: [],
      buyersToDisplay: [],
    };

    this.getVehicles = this.getVehicles.bind(this);
    this.getPotentialBuyers = this.getPotentialBuyers.bind(this);
    this.sellCar = this.sellCar.bind(this);
    this.addCar = this.addCar.bind(this);
    this.filterByColor = this.filterByColor.bind(this);
    this.filterByMake = this.filterByMake.bind(this);
    this.addBuyer = this.addBuyer.bind(this);
    this.nameSearch = this.nameSearch.bind(this);
    this.resetData = this.resetData.bind(this);
    this.byYear = this.byYear.bind(this);
    this.deleteBuyer = this.deleteBuyer.bind(this);
  }

  async getVehicles() {
    try {
      const { data } = await axios.get(
        "https://joes-autos.herokuapp.com/api/vehicles"
      );
      toast.success("Successfully got Vehicles");
      this.setState({ vehiclesToDisplay: data });
    } catch (error) {
      toast.error("Failed at fetching Vehicles");
    }
  }

  async getPotentialBuyers() {
    try {
      const { data } = await axios.get(
        `https://joes-autos.herokuapp.com/api/buyers`
      );
      toast.success("Succesfully got Buyers");
      this.setState({ buyersToDisplay: data });
    } catch (error) {
      toast.error("couldn't get buyers");
    }
    // axios (GET)
    // setState with response -> buyersToDisplay
  }

  async sellCar(id) {
    try {
      const { data } = await axios.delete(
        `https://joes-autos.herokuapp.com/api/vehicles/${id}`
      );
      toast.success("Car sold!!");
      this.setState({ vehiclesToDisplay: data.vehicles });
    } catch (error) {
      toast.error("Couldn't Sell car");
    }
    // axios (DELETE)
    // setState with response -> vehiclesToDisplay
  }

  async filterByMake() {
    let make = this.selectedMake.value;
    try {
      const { data } = await axios.get(
        `https://joes-autos.herokuapp.com/api/vehicles?make=${make}`
      );
      toast.success("got cars!");
      this.setState({ vehiclesToDisplay: data });
    } catch (error) {
      toast.error("nooooo");
    }
    // axios (GET)
    // setState with response -> vehiclesToDisplay
  }

  async filterByColor() {
    let color = this.selectedColor.value;
    try {
      const { data } = await axios.get(
        `https://joes-autos.herokuapp.com/api/vehicles?color=${color}`
      );
      toast.success("yay");
      this.setState({ vehiclesToDisplay: data });
    } catch (error) {
      toast.error("cnooasdfasd");
    }

    // axios (GET)
    // setState with response -> vehiclesToDisplay
  }

  async updatePrice(priceChange, id) {
    try {
      const { data } = await axios.put(
        `https://joes-autos.herokuapp.com/api/vehicles/${id}/${priceChange}`
      );
      toast.success("Successfully changed price");
      this.setState({ vehiclesToDisplay: data.vehicles });
    } catch (error) {
      toast.error("Unsuccessful");
    }
    // axios (PUT)
    // setState with response -> vehiclesToDisplay
  }

  async addCar() {
    let newCar = {
      make: this.make.value,
      model: this.model.value,
      color: this.color.value,
      year: this.year.value,
      price: this.price.value,
    };

    // axios (POST)
    try {
      const { data } = await axios.post(
        `https://joes-autos.herokuapp.com/api/vehicles`,
        newCar
      );
      toast.success("Successfully added Vehicle");
      this.setState({ vehiclesToDisplay: data.vehicles });
    } catch (error) {
      toast.error("Unable to add vehicle");
    }
    // setState with response -> vehiclesToDisplay
  }

  async addBuyer() {
    let newBuyer = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value,
    };

    try {
      const { data } = await axios.post(
        `https://joes-autos.herokuapp.com/api/buyers`,
        newBuyer
      );
      toast.success("added buyer");
      this.setState({ buyersToDisplay: data.buyers });
    } catch (error) {
      toast.error(error);
    }

    //axios (POST)
    // setState with response -> buyersToDisplay
  }

  async deleteBuyer(id) {
    try {
      const { data } = await axios.delete(
        `https://joes-autos.herokuapp.com/api/buyers/${id}`
      );
      toast.success("buyer removed");
      this.setState({ buyersToDisplay: data.buyers });
    } catch (error) {
      toast.error(error);
    }
    // axios (DELETE)
    //setState with response -> buyersToDisplay
  }

  async nameSearch() {
    let searchLetters = this.searchLetters.value;

    try {
      const { data } = await axios.get(
        `https://joes-autos.herokuapp.com/api/buyers?name=${searchLetters}`
      );
      toast.success("found them!");
      this.setState({ buyersToDisplay: data });
    } catch (error) {
      toast.error("couldnt find");
    }
    // axios (GET)
    // setState with response -> buyersToDisplay
  }

  async byYear() {
    let year = this.searchYear.value;
    try {
      const { data } = await axios.get(
        `https://joes-autos.herokuapp.com/api/vehicles?year=${year}`
      );
      toast.success("got cars!");
      this.setState({ vehiclesToDisplay: data });
    } catch (error) {
      toast.error("nooooo");
    }
    // axios (GET)
    // setState with response -> vehiclesToDisplay
  }

  // Do not edit the code below
  resetData(dataToReset) {
    axios
      .get("https://joes-autos.herokuapp.com/api/" + dataToReset + "/reset")
      .then((res) => {
        if (dataToReset === "vehicles") {
          this.setState({ vehiclesToDisplay: res.data.vehicles });
        } else {
          this.setState({ buyersToDisplay: res.data.buyers });
        }
      });
  }
  // Do not edit the code above

  render() {
    const vehicles = this.state.vehiclesToDisplay.map((v) => {
      return (
        <div key={v.id}>
          <p>Make: {v.make}</p>
          <p>Model: {v.model}</p>
          <p>Year: {v.year}</p>
          <p>Color: {v.color}</p>
          <p>Price: {v.price}</p>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice("up", v.id)}
          >
            Increase Price
          </button>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice("down", v.id)}
          >
            Decrease Price
          </button>

          <button className="btn btn-sp" onClick={() => this.sellCar(v.id)}>
            SOLD!
          </button>

          <hr className="hr" />
        </div>
      );
    });

    const buyers = this.state.buyersToDisplay.map((person) => {
      return (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Phone: {person.phone}</p>
          <p>Address: {person.address}</p>

          <button
            className="btn"
            onClick={() => {
              this.deleteBuyer(person.id);
            }}
          >
            No longer interested
          </button>

          <hr className="hr" />
        </div>
      );
    });

    return (
      <div>
        <ToastContainer />

        <header className="header">
          <img src={logo} alt="" />

          <button
            className="header-btn1 btn"
            onClick={() => this.resetData("vehicles")}
          >
            Reset Vehicles
          </button>

          <button
            className="header-btn2 btn"
            onClick={() => this.resetData("buyers")}
          >
            Reset Buyers
          </button>
        </header>

        <div className="btn-container">
          <button className="btn-sp btn" onClick={this.getVehicles}>
            Get All Vehicles
          </button>

          <select
            onChange={this.filterByMake}
            ref={(selectedMake) => {
              this.selectedMake = selectedMake;
            }}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by make
            </option>
            <option value="Suzuki">Suzuki</option>
            <option value="GMC">GMC</option>
            <option value="Ford">Ford</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Dodge">Dodge</option>
            <option value="Chrysler">Chrysler</option>
          </select>

          <select
            ref={(selectedColor) => {
              this.selectedColor = selectedColor;
            }}
            onChange={this.filterByColor}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by color
            </option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
          </select>

          <input
            onChange={this.nameSearch}
            placeholder="Search by name"
            type="text"
            ref={(searchLetters) => {
              this.searchLetters = searchLetters;
            }}
          />

          <input
            ref={(searchYear) => {
              this.searchYear = searchYear;
            }}
            className="btn-sp"
            type="number"
            placeholder="Year"
          />

          <button onClick={this.byYear} className="btn-inp">
            Go
          </button>

          <button className="btn-sp btn" onClick={this.getPotentialBuyers}>
            Get Potential Buyers
          </button>
        </div>

        <br />

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="make"
            ref={(make) => {
              this.make = make;
            }}
          />
          <input
            className="btn-sp"
            placeholder="model"
            ref={(model) => {
              this.model = model;
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="year"
            ref={(year) => {
              this.year = year;
            }}
          />
          <input
            className="btn-sp"
            placeholder="color"
            ref={(color) => {
              this.color = color;
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="price"
            ref={(price) => {
              this.price = price;
            }}
          />

          <button className="btn-sp btn" onClick={this.addCar}>
            Add vehicle
          </button>
        </p>

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="name"
            ref={(name) => {
              this.name = name;
            }}
          />
          <input
            className="btn-sp"
            placeholder="phone"
            ref={(phone) => {
              this.phone = phone;
            }}
          />
          <input
            className="btn-sp"
            placeholder="address"
            ref={(address) => {
              this.address = address;
            }}
          />

          <button onClick={this.addBuyer} className="btn-sp btn">
            Add buyer
          </button>
        </p>

        <main className="main-wrapper">
          <section className="info-box">
            <h3>Inventory</h3>

            {vehicles}
          </section>

          <section className="info-box">
            <h3>Potential Buyers</h3>

            {buyers}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
