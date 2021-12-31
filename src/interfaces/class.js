export type IClass =
  | any

  /**
   * Align Content
   * Utilities for controlling how rows are positioned in multi-row flex and grid containers.
   */
  | 'content-start' // converts to {alignContent: 'flex-start'},
  | 'content-end' // converts to {alignContent: 'flex-end'},
  | 'content-center' // converts to {alignContent: 'center'},
  | 'content-stretch' // converts to {alignContent: 'stretch'},
  | 'content-between' // converts to {alignContent: 'space-between'},
  | 'content-around' // converts to {alignContent: 'space-around'},

  /**
   * Align Items
   * Utilities for controlling how flex and grid items are positioned along a container's cross axis.
   */
  | 'items-start' // converts to {alignItems: 'flex-start'},
  | 'items-end' // converts to {alignItems: 'flex-end'},
  | 'items-center' // converts to {alignItems: 'center'},
  | 'items-stretch' // converts to {alignItems: 'stretch'},
  | 'items-baseline' // converts to {alignItems: 'baseline'},

  /**
   * Align Self
   * Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.
   */
  | 'self-start' // converts to {alignSelf: 'flex-start'},
  | 'self-end' // converts to {alignSelf: 'flex-end'},
  | 'self-center' // converts to {alignSelf: 'center'},
  | 'self-stretch' // converts to {alignSelf: 'stretch'},
  | 'self-baseline' // converts to {alignSelf: 'baseline'},
  | 'self-auto' // converts to {alignSelf: 'auto'},

  /**
   * Justify Content
   * Utilities for controlling how flex and grid items are positioned along a container's main axis.
   */
  | 'justify-start' // converts to {justifyContent: 'flex-start'},
  | 'justify-end' // converts to {justifyContent: 'flex-end'},
  | 'justify-center' // converts to {justifyContent: 'center'},
  | 'justify-between' // converts to {justifyContent: 'space-between'},
  | 'justify-around' // converts to {justifyContent: 'space-around'},
  | 'justify-evenly' // converts to {justifyContent: 'space-evenly'},

  /**
   * Overflow
   * Utilities for controlling how an element handles content that is too large for the container.
   */
  | 'overflow-visible' // converts to {overflow: 'visible'},
  | 'overflow-hidden' // converts to {overflow: 'hidden'},
  | 'overflow-scroll' // converts to {overflow: 'scroll'},

  /**
   * Display
   * Utilities for controlling the display box type of an element.
   */
  | 'hidden' // converts to {display: 'none'},
  | 'display-flex' // converts to {display: 'flex'},

  /**
   * Position
   * Utilities for controlling how an element is positioned in the DOM.
   */
  | 'absolute' // converts to {position: 'absolute'},
  | 'relative' // converts to {position: 'relative'},
  | 'top-' // converts to {top: dynamic-value},
  | 'bottom-' // converts to {bottom: dynamic-value},
  | 'left-' // converts to {left: dynamic-value},
  | 'right-' // converts to {right: dynamic-value},

  /**
   * Opacity
   * Utilities for controlling the opacity of an element.
   */
  | 'opacity-' // converts to {opacity: dynamic-value},

  /**
   * Flex
   * Utilities for controlling how flex items both grow and shrink.
   */
  | 'flex-' // converts to {flex: dynamic-value},
  | 'flex-basis-' // converts to {flexBasis: dynamic-value},
  | 'flex-row' // converts to {flexDirection: 'row'},
  | 'flex-col' // converts to {flexDirection: 'column'},
  | 'flex-row-reverse' // converts to {flexDirection: 'row-reverse'},
  | 'flex-col-reverse' // converts to {flexDirection: 'column-reverse'},
  | 'flex-grow' // converts to {flexGrow: 1},
  | 'flex-grow-0' // converts to {flexGrow: 0},
  | 'flex-shrink' // converts to {flexShrink: 1},
  | 'flex-shrink-0' // converts to {flexShrink: 0},
  | 'flex-wrap' // converts to {flexWrap: 'wrap'},
  | 'flex-nowrap' // converts to {flexWrap: 'nowrap'},
  | 'flex-wrap-reverse' // converts to {flexWrap: 'wrap-reverse'},

  /**
   * Size
   * Utilities for setting the size of an element
   */
  | 'height-' // converts to {height: dynamic-value},
  | 'width-' // converts to {width: dynamic-value},
  | 'max-h-' // converts to {maxHeight: dynamic-value},
  | 'max-w-' // converts to {maxWidth: dynamic-value},
  | 'min-h-' // converts to {minHeight: dynamic-value},
  | 'min-w-' // converts to {minWidth: dynamic-value},

  /**
   * Margin
   * Utilities for controlling an element's margin.
   */
  | 'mt-' // converts to {marginTop: dynamic-value},
  | 'mb-' // converts to {marginBottom: dynamic-value},
  | 'ml-' // converts to {marginLeft: dynamic-value},
  | 'mr-' // converts to {marginRight: dynamic-value},
  | 'mx-' // converts to {marginHorizontal: dynamic-value},
  | 'my-' // converts to {marginVertical: dynamic-value},

  /**
   * Padding
   * Utilities for controlling an element's padding.
   */
  | 'pt-' // converts to {paddingTop: dynamic-value},
  | 'pb-' // converts to {paddingBottom: dynamic-value},
  | 'pl-' // converts to {paddingLeft: dynamic-value},
  | 'pr-' // converts to {paddingRight: dynamic-value},
  | 'px-' // converts to {paddingHorizontal: dynamic-value},
  | 'py-' // converts to {paddingVertical: dynamic-value},

  /**
   * Z-Index
   * Utilities for controlling the stack order of an element.
   */
  | 'z-' // converts to {zIndex: dynamic-value}

  /**
   * Image size
   * Utilities for controlling the image of an element.
   */
  | 'image-cover' // converts to {resizeMode: 'cover'},
  | 'image-contain' // converts to {resizeMode: 'contain'},
  | 'image-stretch' // converts to {resizeMode: 'stretch'},
  | 'image-repeat' // converts to {resizeMode: 'repeat'},
  | 'image-center' // converts to {resizeMode: 'center'}

  /**
   * Border Width
   * Utilities for controlling the width of an element's borders.
   */
  | 'border-t-w-' // converts to {borderTopWidth: dynamic-value},
  | 'border-b-w-' // converts to {borderBottomWidth: dynamic-value},
  | 'border-l-w-' // converts to {borderLeftWidth: dynamic-value},
  | 'border-r-w-' // converts to {borderRightWidth: dynamic-value},
  | 'border-w-' // converts to {borderWidth: dynamic-value},

  /**
   * Border Radius
   * Utilities for controlling the border radius of an element.
   */
  | 'rounded-' // converts to {borderRadius: dynamic-value},
  | 'rounded-b-e-' // converts to {borderBottomEndRadius: dynamic-value},
  | 'rounded-b-l-' // converts to {borderBottomLeftRadius: dynamic-value},
  | 'rounded-b-r-' // converts to {borderBottomRightRadius: dynamic-value},
  | 'rounded-b-s-' // converts to {borderBottomStartRadius: dynamic-value},
  | 'rounded-t-e-' // converts to {borderTopEndRadius: dynamic-value},
  | 'rounded-t-l-' // converts to {borderTopLeftRadius: dynamic-value},
  | 'rounded-t-r-' // converts to {borderTopRightRadius: dynamic-value},
  | 'rounded-t-s-' // converts to {borderTopStartRadius: dynamic-value},

  /**
   * Border Style
   * Utilities for controlling the style of an element's borders.
   */
  | 'border-solid' // converts to {borderStyle: 'solid'},
  | 'border-dotted' // converts to {borderStyle: 'dotted'},
  | 'border-dashed'; // converts to {borderStyle: 'dashed'},
