function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PlacesAutocomplete = _interopDefault(require('react-places-autocomplete'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var PlaceAddress = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PlaceAddress, _React$Component);

  function PlaceAddress(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      address: "",
      data: [],
      name: ""
    };
    _this.handleScriptLoad = _this.handleScriptLoad.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PlaceAddress.prototype;

  _proto.handleScriptLoad = function handleScriptLoad() {
    var options = {
      types: ["geocode"]
    };
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById(this.props.id), options);
    this.autocomplete.setFields(["address_components", "formatted_address"]);
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  _proto.handlePlaceSelect = function handlePlaceSelect() {
    var addressObject = this.autocomplete.getPlace();

    if (addressObject) {
      var address = addressObject.address_components;

      if (address) {
        this.setState({
          city: address[0].long_name,
          query: addressObject.formatted_address
        });
      }
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var searchAddressOptions = {
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
    }, function (_ref) {
      var getInputProps = _ref.getInputProps,
          suggestions = _ref.suggestions,
          getSuggestionItemProps = _ref.getSuggestionItemProps;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({}, getInputProps({
        placeholder: _this2.props.placeholder,
        className: _this2.props.className
      }), {
        autoFocus: true,
        id: _this2.props.id,
        "data-elmkey": _this2.props.elmkey,
        onKeyDown: _this2.props.onKeyDown,
        onFocus: _this2.props.onFocus,
        onBlur: _this2.props.onBlur
      })), /*#__PURE__*/React.createElement("div", {
        className: "autocomplete-dropdown-container"
      }, _this2.state.data.length > 0 ? _this2.state.data.map(function (suggestion) {
        var className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
        var style = suggestion.active ? {
          backgroundColor: " rgba(50, 50, 50, 0.8)",
          padding: "10px",
          cursor: "pointer"
        } : {
          backgroundColor: "rgba(50, 50, 50, 0.8)",
          padding: "10px",
          cursor: "pointer"
        };
        return /*#__PURE__*/React.createElement("div", getSuggestionItemProps(suggestion, {
          className: className,
          style: style
        }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
          className: "map"
        }, " ", suggestion)));
      }) : suggestions.map(function (suggestion) {
        var className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
        var style = suggestion.active ? {
          backgroundColor: " rgba(50, 50, 50, 0.8)",
          padding: "10px",
          cursor: "pointer"
        } : {
          backgroundColor: "rgba(50, 50, 50, 0.8)",
          padding: "10px",
          cursor: "pointer"
        };
        return /*#__PURE__*/React.createElement("div", getSuggestionItemProps(suggestion, {
          className: className,
          style: style
        }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
          className: "map"
        }, " ", suggestion.description)));
      })));
    }));
  };

  return PlaceAddress;
}(React.Component);

module.exports = PlaceAddress;
//# sourceMappingURL=index.js.map
