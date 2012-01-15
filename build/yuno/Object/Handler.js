/*!
(C) @WebReflection - Mit Style License
*/
/**@license (C) @WebReflection - Mit Style License
*//**
 *  interface ObjectHandler implements EventListener {
 *      void                handleEvent(in Event evt);
 *      void                remitEvent(in Event evt);
 *      attribute   Object  events;
 *  };
 *
 *  @link   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener
 */

yuno.add(yuno.Object, "Handler", {value: {
  handleEvent: function handleEvent(e) {
    var
      events = this.events,
      type = e.type
    ;
    if (events.hasOwnProperty(type)) {
      events[type].call(this, e);
    }
  },
  removeEvent: function cancelEvent(e) {
    e.currentTarget.removeEventListener(
      e.type, this, e.eventPhase === e.CAPTURING_PHASE
    );
  },
  events: null // to be set as new object per each instance
}});
