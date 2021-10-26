export type INavigation = {
  /**
   * A navigator is an object of navigation functions that a view can call.
   */
  /**
   * Navigate forward to a new route
   */
  push: (route: Route) => void,

  /**
   * Go back one page
   */
  pop: () => void,

  /**
   * Go back N pages at once. When N=1, behavior matches pop()
   */
  popN: (n: number) => void,

  /**
   * Replace the route for the current page and immediately load the view for the new route
   */
  replace: (route: Route) => void,

  /**
   * Replace the route/view for the previous page
   */
  replacePrevious: (route: Route) => void,

  /**
   * Replaces the previous route/view and transitions back to it
   */
  replacePreviousAndPop: (route: Route) => void,

  /**
   * Replaces the top item and popToTop
   */
  resetTo: (route: Route) => void,

  /**
   * Go back to the item for a particular route object
   */
  popToRoute(route: Route): void,

  /**
   * Go back to the top item
   */
  popToTop(): void,

  /**
   * Dispatch an action or an update function to the router.
   * The update function will receive the current state,
   *
   * @param action Action object or update function.
   */
  dispatch(action: (state: State) => NavigationAction): void,

  /**
   * Navigate to a route in current navigation tree.
   *
   * @param name Name of the route to navigate to.
   * @param [params] Params object for the route.
   */
  navigate(route: string, params?: object): void,

  /**
   * Go back to the previous route in history.
   */
  goBack(name?: string): void,

  /**
   * Check if dispatching back action will be handled by navigation.
   * Note that this method doesn't re-render screen when the result changes. So don't use it in `render`.
   */
  canGoBack(): boolean,

  /**
   * The listener of current navigation.
   */
  addListener(name?: string, fun: Function): void
};
