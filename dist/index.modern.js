import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class PlaceAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      data: [],
      name: ""
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  handleScriptLoad() {
    let options = {
      types: ["geocode"]
    };
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById(this.props.id), options);
    this.autocomplete.setFields(["address_components", "formatted_address"]);
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace();

    if (addressObject) {
      let address = addressObject.address_components;

      if (address) {
        this.setState({
          city: address[0].long_name,
          query: addressObject.formatted_address
        });
      }
    }
  }

  render() {
    const searchAddressOptions = {
      componentRestrictions: {
        country: [this.props.country]
      }
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlacesAutocomplete, {
      className: "form-group",
      value: this.props.value,
      onChange: this.props.onChange,
      onFocus: this.handleScriptLoad,
      onSelect: this.props.onSelect,
      onLoad: this.handleScriptLoad,
      searchOptions: searchAddressOptions
    }, ({
      getInputProps,
      suggestions,
      getSuggestionItemProps,
      loading
    }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", Object.assign({}, getInputProps({
      placeholder: this.props.placeholder,
      className: this.props.className
    }), {
      autoFocus: true,
      id: this.props.id,
      "data-elmkey": this.props.elmkey,
      onKeyDown: this.props.onKeyDown,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur
    })), /*#__PURE__*/React.createElement("div", {
      className: "autocomplete-dropdown-container"
    }, this.state.data.length > 0 ? this.state.data.map(suggestion => {
      let className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
      let style = suggestion.active ? {
        backgroundColor: " rgba(50, 50, 50, 0.8)",
        padding: "10px",
        cursor: "pointer"
      } : {
        backgroundColor: "rgba(50, 50, 50, 0.8)",
        padding: "10px",
        cursor: "pointer"
      };
      return /*#__PURE__*/React.createElement("div", getSuggestionItemProps(suggestion, {
        className,
        style
      }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "map"
      }, " ", suggestion)));
    }) : suggestions.map(suggestion => {
      let className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
      let style = suggestion.active ? {
        backgroundColor: " rgba(50, 50, 50, 0.8)",
        padding: "10px",
        cursor: "pointer"
      } : {
        backgroundColor: "rgba(50, 50, 50, 0.8)",
        padding: "10px",
        cursor: "pointer"
      };
      return /*#__PURE__*/React.createElement("div", getSuggestionItemProps(suggestion, {
        className,
        style
      }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "map"
      }, " ", suggestion.description)));
    })))));
  }

}

export default PlaceAddress;
//# sourceMappingURL=index.modern.js.map
