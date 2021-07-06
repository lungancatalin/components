import {Observable} from 'rxjs';
import {MeetingControlState} from '@webex/component-adapter-interfaces';
import MeetingControl from './MeetingControl';
/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class ProceedWithoutCameraControl extends MeetingControl {
  /**
   * Joins the meeting without camera
   *
   * @param {string} meetingID  Id of the meeting for which to join
   */
  async action(meetingID) {
    await this.adapter.ignoreVideoAccessPrompt(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the meeting without camera control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  // eslint-disable-next-line class-methods-use-this
  display() {
    return Observable.create((observer) => {
      observer.next({
        ID: this.ID,
        text: 'Proceed without camera',
        tooltip: 'Proceed without camera',
        state: MeetingControlState.ACTIVE,
      });

      observer.complete();
    });
  }
}
