import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

class PlaceAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      data: [],
      name: ""
    };
    //service
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  /**
   * This methos is used to handle google place autocomplete
   */
  handleScriptLoad() {
    // Declare Options For Autocomplete
    let options = {
      types: ["geocode"]
    };

    // Initialize Google Autocomplete
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById(this.props.id),
      options
    );
    // Avoid paying for data that you don't need by restricting the
    // set of place fields that are returned to just the address
    // components and formatted address
    this.autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  /**
   * This method is used to select one of the autocomplete suggestions
   */
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
      componentRestrictions: { country: [this.props.country] }
    };

    return (
      <div>
        <PlacesAutocomplete
          className="form-group"
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.handleScriptLoad}
          onSelect={this.props.onSelect}
          onLoad={this.handleScriptLoad}
          searchOptions={ searchAddressOptions}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: this.props.placeholder,
                  className: this.props.className
                })}
                autoFocus={true}
                id={this.props.id}
                data-elmkey={this.props.elmkey}
                onKeyDown={this.props.onKeyDown}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
              />

              <div className="autocomplete-dropdown-container">
                {this.state.data.length > 0
                  ? this.state.data.map(suggestion => {
                      let className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      let style = suggestion.active
                        ? {
                            backgroundColor: " rgba(50, 50, 50, 0.8)",
                            padding: "10px",
                            cursor: "pointer"
                          }
                        : {
                            backgroundColor: "rgba(50, 50, 50, 0.8)",
                            padding: "10px",
                            cursor: "pointer"
                          };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>
                            <span className="map"> {suggestion}</span>
                          </span>
                        </div>
                      );
                    })
                  : suggestions.map(suggestion => {
                      let className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      let style = suggestion.active
                        ? {
                            backgroundColor: " rgba(50, 50, 50, 0.8)",
                            padding: "10px",
                            cursor: "pointer"
                          }
                        : {
                            backgroundColor: "rgba(50, 50, 50, 0.8)",
                            padding: "10px",
                            cursor: "pointer"
                          };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>
                            <span className="map">
                              {" "}
                              {suggestion.description}
                            </span>
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
export default PlaceAddress;
