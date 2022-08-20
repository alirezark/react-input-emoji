// @ts-check
/* eslint-disable react/prop-types */
// vendors
import React, { useEffect, useState } from "react";
import {
  getImageEmoji,
  replaceAllTextEmojis,
  replaceAllTextEmojiToString
} from "../utils/emoji-utils";

import EmojiPicker from "./emoji-picker";

/**
 * @typedef {import('../types/types').SanitizeFn} SanitizeFn
 */

/**
 * @typedef {import('../types/types').PolluteFn} PolluteFn
 */

/**
 * @typedef {Object} Props
 * @property {'light' | 'dark' | 'auto'} theme
 * @property {boolean} keepOpened
 * @property {boolean} disableRecent
 * @property {object[]=} customEmojis
 * @property {(fn: SanitizeFn) => void} addSanitizeFn
 * @property {(fn: PolluteFn) => void} addPolluteFn
 * @property {(html: string) => void} appendContent
 */

// eslint-disable-next-line valid-jsdoc
/** @type {React.FC<Props>} */
const EmojiPickerWrapper = (props) => {
  const {
    theme,
    keepOpened,
    disableRecent,
    customEmojis,
    addSanitizeFn,
    addPolluteFn,
    appendContent,
  } = props;

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    addSanitizeFn(replaceAllTextEmojiToString);
  }, [addSanitizeFn]);

  useEffect(() => {
    addPolluteFn(replaceAllTextEmojis);
  }, [addPolluteFn]);

  useEffect(() => {
    /**
     *
     * @param {MouseEvent} event
     */
    function checkClickOutside(event) {
      /** @type {HTMLElement} */
      // @ts-ignore
      const element = event.target;

      if (
        element.classList.contains("react-input-emoji--button") ||
        element.classList.contains("react-input-emoji--button--icon")
      ) {
        return;
      }

      setShowPicker(false);
    }

    document.addEventListener("click", checkClickOutside);

    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, []);

  /**
   *
   * @param {React.MouseEvent} event
   */
  function toggleShowPicker(event) {
    event.stopPropagation();
    event.preventDefault();

    setShowPicker(currentShowPicker => !currentShowPicker);
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {import("../types/types").EmojiMartItem} emoji
   */
  function handleSelectEmoji(emoji) {
    appendContent(getImageEmoji(emoji));

    if (!keepOpened) {
      setShowPicker(currentShowPicker => !currentShowPicker);
    }
  }

  return (
    <>
      <div className="react-emoji-picker--container">
        {showPicker && (
          <div
            className="react-emoji-picker--wrapper"
            onClick={evt => evt.stopPropagation()}
          >
            <div className="react-emoji-picker">
              <EmojiPicker
                theme={theme}
                onSelectEmoji={handleSelectEmoji}
                disableRecent={disableRecent}
                customEmojis={customEmojis}
              />
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        className={`react-input-emoji--button${showPicker ? " react-input-emoji--button__show" : ""
          }`}
        onClick={toggleShowPicker}
      >
        <svg
          className="react-input-emoji--button--icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            {/* eslint-disable-next-line max-len */}
            <path d="M8.625 12C9.24632 12 9.75 11.4963 9.75 10.875C9.75 10.2537 9.24632 9.75 8.625 9.75C8.00368 9.75 7.5 10.2537 7.5 10.875C7.5 11.4963 8.00368 12 8.625 12Z" fill="#5B6167"/>
            {/* eslint-disable-next-line max-len */}
            <path d="M12.0005 18C9.87141 18 8.08079 16.6158 7.51407 14.7268C7.49822 14.6705 7.49572 14.6114 7.50677 14.5541C7.51782 14.4967 7.54212 14.4427 7.57772 14.3964C7.61333 14.3501 7.65925 14.3128 7.71184 14.2874C7.76443 14.2619 7.82223 14.2492 7.88063 14.25H16.1161C16.1745 14.2492 16.2323 14.2619 16.2849 14.2874C16.3375 14.3128 16.3834 14.3501 16.419 14.3964C16.4546 14.4427 16.4789 14.4967 16.49 14.5541C16.501 14.6114 16.4985 14.6705 16.4827 14.7268C15.9206 16.6158 14.1295 18 12.0005 18Z" fill="#5B6167"/>
            {/* eslint-disable-next-line max-len */}
            <path d="M15.375 12C15.9963 12 16.5 11.4963 16.5 10.875C16.5 10.2537 15.9963 9.75 15.375 9.75C14.7537 9.75 14.25 10.2537 14.25 10.875C14.25 11.4963 14.7537 12 15.375 12Z" fill="#5B6167"/>
            {/* eslint-disable-next-line max-len */}
            <path d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z" stroke="#5B6167" stroke-miterlimit="10"/>
          </g>
        </svg>
      </button>
    </>
  );
};

export default EmojiPickerWrapper;
