const viewProperties = {
  /**
   * Align Content
   * Utilities for controlling how rows are positioned in multi-row flex and grid containers.
   */
  'content-start': {alignContent: 'flex-start'},
  'content-end': {alignContent: 'flex-end'},
  'content-center': {alignContent: 'center'},
  'content-stretch': {alignContent: 'stretch'},
  'content-between': {alignContent: 'space-between'},
  'content-around': {alignContent: 'space-around'},

  /**
   * Align Items
   * Utilities for controlling how flex and grid items are positioned along a container's cross axis.
   */
  'items-start': {alignItems: 'flex-start'},
  'items-end': {alignItems: 'flex-end'},
  'items-center': {alignItems: 'center'},
  'items-stretch': {alignItems: 'stretch'},
  'items-baseline': {alignItems: 'baseline'},

  /**
   * Align Self
   * Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.
   */
  'self-start': {alignSelf: 'flex-start'},
  'self-end': {alignSelf: 'flex-end'},
  'self-center': {alignSelf: 'center'},
  'self-stretch': {alignSelf: 'stretch'},
  'self-baseline': {alignSelf: 'baseline'},
  'self-auto': {alignSelf: 'auto'},

  /**
   * Justify Content
   * Utilities for controlling how flex and grid items are positioned along a container's main axis.
   */
  'justify-start': {justifyContent: 'flex-start'},
  'justify-end': {justifyContent: 'flex-end'},
  'justify-center': {justifyContent: 'center'},
  'justify-between': {justifyContent: 'space-between'},
  'justify-around': {justifyContent: 'space-around'},
  'justify-evenly': {justifyContent: 'space-evenly'},

  /**
   * Overflow
   * Utilities for controlling how an element handles content that is too large for the container.
   */
  'overflow-visible': {overflow: 'visible'},
  'overflow-hidden': {overflow: 'hidden'},
  'overflow-scroll': {overflow: 'scroll'},

  /**
   * Display
   * Utilities for controlling the display box type of an element.
   */
  hidden: {display: 'none'},
  'display-flex': {display: 'flex'},

  /**
   * Position
   * Utilities for controlling how an element is positioned in the DOM.
   */
  absolute: {position: 'absolute'},
  relative: {position: 'relative'},
  top: {top: 0},
  bottom: {bottom: 0},
  left: {left: 0},
  right: {right: 0},

  /**
   * Opacity
   * Utilities for controlling the opacity of an element.
   */
  opacity: {opacity: 0},

  /**
   * Flex
   * Utilities for controlling how flex items both grow and shrink.
   */
  flex: {flex: 0},
  'flex-basis': {flexBasis: 0},
  'flex-row': {flexDirection: 'row'},
  'flex-col': {flexDirection: 'column'},
  'flex-row-reverse': {flexDirection: 'row-reverse'},
  'flex-col-reverse': {flexDirection: 'column-reverse'},
  'flex-grow': {flexGrow: 1},
  'flex-grow-0': {flexGrow: 0},
  'flex-shrink': {flexShrink: 1},
  'flex-shrink-0': {flexShrink: 0},
  'flex-wrap': {flexWrap: 'wrap'},
  'flex-nowrap': {flexWrap: 'nowrap'},
  'flex-wrap-reverse': {flexWrap: 'wrap-reverse'},

  /**
   * Size
   * Utilities for setting the size of an element
   */
  height: {height: 0},
  width: {width: 0},
  'max-h': {maxHeight: 0},
  'max-w': {maxWidth: 0},
  'min-h': {minHeight: 0},
  'min-w': {minWidth: 0},

  /**
   * Margin
   * Utilities for controlling an element's margin.
   */
  mt: {marginTop: 0},
  mb: {marginBottom: 0},
  ml: {marginLeft: 0},
  mr: {marginRight: 0},
  mx: {marginHorizontal: 0},
  my: {marginVertical: 0},

  /**
   * Padding
   * Utilities for controlling an element's padding.
   */
  pt: {paddingTop: 0},
  pb: {paddingBottom: 0},
  pl: {paddingLeft: 0},
  pr: {paddingRight: 0},
  px: {paddingHorizontal: 0},
  py: {paddingVertical: 0},

  /**
   * Z-Index
   * Utilities for controlling the stack order of an element.
   */
  z: {zIndex: 0}
};

const imageProperties = {
  /**
   * Image size
   * Utilities for controlling the image of an element.
   */
  'image-cover': {resizeMode: 'cover'},
  'image-contain': {resizeMode: 'contain'},
  'image-stretch': {resizeMode: 'stretch'},
  'image-repeat': {resizeMode: 'repeat'},
  'image-center': {resizeMode: 'center'}
};

const borderProperties = {
  /**
   * Border Width
   * Utilities for controlling the width of an element's borders.
   */
  'border-t-w': {borderTopWidth: 0},
  'border-b-w': {borderBottomWidth: 0},
  'border-l-w': {borderLeftWidth: 0},
  'border-r-w': {borderRightWidth: 0},
  'border-w': {borderWidth: 0},

  /**
   * Border Radius
   * Utilities for controlling the border radius of an element.
   */
  rounded: {borderRadius: 0},
  'rounded-b-e': {borderBottomEndRadius: 0},
  'rounded-b-l': {borderBottomLeftRadius: 0},
  'rounded-b-r': {borderBottomRightRadius: 0},
  'rounded-b-s': {borderBottomStartRadius: 0},
  'rounded-t-e': {borderTopEndRadius: 0},
  'rounded-t-l': {borderTopLeftRadius: 0},
  'rounded-t-r': {borderTopRightRadius: 0},
  'rounded-t-s': {borderTopStartRadius: 0},

  /**
   * Border Style
   * Utilities for controlling the style of an element's borders.
   */
  'border-solid': {borderStyle: 'solid'},
  'border-dotted': {borderStyle: 'dotted'},
  'border-dashed': {borderStyle: 'dashed'}
};

export default {
  ...viewProperties,
  ...imageProperties,
  ...borderProperties
};
