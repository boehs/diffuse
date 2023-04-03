import { SeparatorProps, DropdownItemProps, FormProps, Dropdown, DropdownProps, DropdownSectionProps, Image, Separator } from '.';
import { FunctionComponent, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

export declare namespace Form {
    export type ItemProps<T extends FormValue> = FormItemProps<T>;
    export type Value = FormValue;
    export type Values = FormValues;
    export type Props = FormProps;
    export type ItemReference = FormItemRef;
    /**
     * An interface describing event in callbacks {@link Form.Item.Props.onFocus} and {@link Form.Item.Props.onBlur}
     */
    export type Event<T extends FormValue> = FormEvent<T>;
    export namespace Event {
        /**
         * Types of Form event {@link Form.Event}
         * * `focus` - the type will be returned for the event of {@link Form.Item.Props.onFocus} callback
         * * `blur` - the type will be returned for the event of {@link Form.Item.Props.onBlur} callback
         */
        export type Type = FormEventType;
    }
    /**
     * A Ref Type for the {@link Form.TextField}.
     * Use refs to control your Form by calling `Form.TextField.focus()` or `Form.TextField.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.TextField}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const textFieldRef = useRef<Form.TextField>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               textFieldRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" ref={textFieldRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.TextField}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const textFieldRef = useRef<Form.TextField>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               textFieldRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" ref={textFieldRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type TextField = TextFieldRef;
    export namespace TextField {
        /**
         * Props of the {@link Form.TextField} React component.
         */
        export type Props = TextFieldProps;
    }
    /**
     * A Ref Type for the {@link Form.PasswordField}.
     * Use refs to control your Form by calling `Form.PasswordField.focus()` or `Form.PasswordField.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.PasswordField}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const passwordFieldRef = useRef<Form.PasswordField>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               passwordFieldRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.PasswordField id="passwordField" title="Enter Password" ref={passwordFieldRef} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.PasswordField}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const passwordFieldRef = useRef<Form.PasswordField>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               passwordFieldRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" ref={passwordFieldRef} />
     *       <Form.PasswordField id="passwordField" title="Enter Password" ref={passwordFieldRef} />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type PasswordField = PasswordFieldRef;
    export namespace PasswordField {
        /**
         * Props of the {@link Form.PasswordField} React component.
         */
        export type Props = PasswordFieldProps;
    }
    /**
     * A Ref Type for the {@link Form.TextArea}.
     * Use refs to control your Form by calling `Form.TextArea.focus()` or `Form.TextArea.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.TextArea}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const textAreaRef = useRef<Form.TextArea>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               textAreaRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" ref={textAreaRef} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.TextArea}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const textAreaRef = useRef<Form.TextArea>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               textAreaRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" ref={textAreaRef} />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type TextArea = TextAreaRef;
    export namespace TextArea {
        /**
         * Props of the {@link Form.TextArea} React component.
         */
        export type Props = TextAreaProps;
    }
    export namespace Description {
        /**
         * Props of the {@link Form.Description} React component.
         */
        export type Props = DescriptionProps;
    }
    export namespace Separator {
        /**
         * Props of the {@link Form.Separator} React component.
         */
        export type Props = SeparatorProps;
    }
    /**
     * A Ref Type for the {@link Form.Checkbox}.
     * Use refs to control your Form by calling `Form.Checkbox.focus()` or `Form.Checkbox.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.Checkbox}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const checkBoxRef = useRef<Form.Checkbox>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               checkBoxRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.Checkbox id="newsletter" label="Subscribe for Newsletter" defaultValue={true} ref={checkBoxRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.Checkbox}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const checkBoxRef = useRef<Form.Checkbox>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               checkBoxRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.Checkbox id="newsletter" label="Subscribe for Newsletter" defaultValue={true} ref={checkBoxRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type Checkbox = CheckboxRef;
    export namespace Checkbox {
        /**
         * Props of the {@link Form.Checkbox} React component.
         */
        export type Props = CheckboxProps;
    }
    /**
     * A Ref Type for the {@link Form.DatePicker}.
     * Use refs to control your Form by calling `Form.DatePicker.focus()` or `Form.DatePicker.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.DatePicker}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const datePickerRef = useRef<Form.DatePicker>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               datePickerRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.DatePicker id="birthday" title="Date of Birth" type={Form.DatePicker.Type.Date} ref={datePickerRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.DatePicker}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const datePickerRef = useRef<Form.DatePicker>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               datePickerRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.DatePicker id="birthday" title="Date of Birth" type={Form.DatePicker.Type.Date} ref={datePickerRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type DatePicker = DatePickerRef;
    export namespace DatePicker {
        /**
         * Props of the {@link Form.DatePicker} React component.
         */
        export type Props = DatePickerProps;
        /**
         * The types of date components the user can pick
         * * `Date` - only year, month, and day can be picked
         * * `DateTime` - hour and second can be picked in addition to year, month and day
         */
        export type Type = DatePickerType;
    }
    /**
     * A Ref Type for the {@link Form.Dropdown}.
     * Use refs to control your Form by calling `Form.Dropdown.focus()` or `Form.Dropdown.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.Dropdown}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const dropdownRef = useRef<Form.Dropdown>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               dropdownRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.Dropdown id="number" title="Choose Your Favorite Number" defaultValue={"3"} ref={dropdownRef}>
     *         {[1, 2, 3, 4, 5, 6, 7].map((num) => {
     *           return <Form.Dropdown.Item value={String(num)} title={String(num)} key={num} />;
     *         })}
     *       </Form.Dropdown>
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.Dropdown}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const dropdownRef = useRef<Form.Dropdown>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               dropdownRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.Dropdown id="number" title="Choose Your Favorite Number" defaultValue={"3"} ref={dropdownRef}>
     *         {[1, 2, 3, 4, 5, 6, 7].map((num) => {
     *           return <Form.Dropdown.Item value={String(num)} title={String(num)} key={num} />;
     *         })}
     *       </Form.Dropdown>
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type Dropdown = DropdownRef;
    export namespace Dropdown {
        /**
         * Props of the {@link Form.Dropdown} React component.
         */
        export type Props = DropdownProps;
        export namespace Section {
            /**
             * Props of the {@link Form.Dropdown.Section} React component.
             */
            export type Props = DropdownSectionProps;
        }
        export namespace Item {
            /**
             * Props of the {@link Form.Dropdown.Item} React component.
             */
            export type Props = DropdownItemProps;
        }
    }
    /**
     * A Ref Type for the {@link Form.TagPicker}.
     * Use refs to control your Form by calling `Form.TagPicker.focus()` or `Form.TagPicker.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.TagPicker}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const tagPickerRef = useRef<Form.TagPicker>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               tagPickerRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.TagPicker id="tags" title="Choose Your Favorite Colors" ref={tagPickerRef}>
     *         {["black", "white", "blue", "yellow", "red"].map((tag) => {
     *           return <Form.TagPicker.Item value={tag} title={tag} key={tag} />;
     *         })}
     *       </Form.TagPicker>
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.TagPicker}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const tagPickerRef = useRef<Form.TagPicker>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               tagPickerRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" />
     *       <Form.TagPicker id="tags" title="Choose Your Favorite Colors" ref={tagPickerRef}>
     *         {["black", "white", "blue", "yellow", "red"].map((tag) => {
     *           return <Form.TagPicker.Item value={tag} title={tag} key={tag} />;
     *         })}
     *       </Form.TagPicker>
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type TagPicker = TagPickerRef;
    export namespace TagPicker {
        /**
         * Props of the {@link Form.TagPicker} React component.
         */
        export type Props = TagPickerProps;
        export namespace Item {
            /**
             * Props of the {@link Form.TagPicker.Item} React component.
             */
            export type Props = TagPickerItemProps;
        }
    }
    /**
     * A Ref Type for the {@link Form.FilePicker}.
     * Use refs to control your Form by calling `Form.FilePicker.focus()` or `Form.FilePicker.reset()` functions.
     *
     * @example
     * Using Ref to focus {@link Form.FilePicker}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const filePickerRef = useRef<Form.FilePicker>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               filePickerRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.FilePicker id="files" ref={filePickerRef} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Using Ref to reset {@link Form.FilePicker}.
     *
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const filePickerRef = useRef<Form.FilePicker>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               filePickerRef.current?.reset();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.FilePicker id="files" ref={filePickerRef} />
     *     </Form>
     *   );
     * }
     * ```
     */
    export type FilePicker = FilePickerRef;
    export namespace FilePicker {
        /**
         * Props of the {@link Form.TextField} React component.
         */
        export type Props = FilePickerProps;
    }
}

/**
 * An interface describing Form events in callbacks
 *
 * @example
 * ```typescript
 *import { Form } from "@raycast/api";
 *
 *export default function Main() {
 *  return (
 *    <Form>
 *      <Form.TextField id="textField" title="Text Field" onBlur={logEvent} onFocus={logEvent} />
 *      <Form.TextArea id="textArea" title="Text Area" onBlur={logEvent} onFocus={logEvent} />
 *      <Form.Dropdown id="dropdown" title="Dropdown" onBlur={logEvent} onFocus={logEvent}>
 *        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
 *          <Form.Dropdown.Item value={String(num)} title={String(num)} key={num} />
 *        ))}
 *      </Form.Dropdown>
 *      <Form.TagPicker id="tagPicker" title="Tag Picker" onBlur={logEvent} onFocus={logEvent}>
 *        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
 *          <Form.TagPicker.Item value={String(num)} title={String(num)} key={num} />
 *        ))}
 *      </Form.TagPicker>
 *    </Form>
 *  );
 *}
 *
 *function logEvent(event: Form.Event) {
 *  console.log(`Event '${event.type}' has happened for '${event.target.id}'. Current 'value': '${event.target.value}'`);
 *}
 *
 * ```
 */
export declare type FormEvent<T extends FormValue> = {
    /**
     * An interface containing target data related to the event
     */
    target: {
        /**
         * The {@link FormItemProps.id} of Form item where the event has happened
         */
        id: string;
        /**
         * The current {@link FormItemProps.value} of Form item where the event has happened
         */
        value?: T;
    };
    /**
     * A type of event
     */
    type: FormEventType;
};

/**
 * Types of Form event ({@link Form.Event}).
 * * `focus` will be returned for the event of {@link Form.Item.Props.onFocus} callback
 * * `blur` will be returned for the event of {@link Form.Item.Props.onBlur} callback
 */
export declare type FormEventType = "focus" | "blur";

/**
 * Props of the Form.Item React component.
 */
export declare interface FormItemProps<T extends FormValue> {
    /**
     * ID of the form item.
     * Make sure to assign each form item a unique id.
     */
    id: string;
    /**
     * The title displayed on the left side of the item.
     */
    title?: string;
    /**
     * An optional info message to describe the form item. It appears on the right side of the item with an info icon. When the icon is hovered, the info message is shown.
     */
    info?: string;
    /**
     * An optional error message to show the form item validation issues.
     * If the `error` is present, the Form Item will be highlighted with red border and will show an error message on the right.
     */
    error?: string;
    /**
     * Indicates whether the value of the item should be persisted after submitting, and restored next time the form is rendered.
     */
    storeValue?: boolean;
    /**
     * Indicates whether the item should be focused automatically once the form is rendered.
     */
    autoFocus?: boolean;
    /**
     * The current value of the item.
     */
    value?: T;
    /**
     * The default value of the item.
     * Keep in mind that `defaultValue` will be configured once per component lifecycle. This means that if a user changes the value, `defaultValue` won't be configured on re-rendering.
     *
     * If you're using `storeValue` and configured it as `true` then the stored value will be set.
     *
     * If you configure `value` at the same time with `defaultValue`, the `value` will be set instead of `defaultValue`.
     */
    defaultValue?: T;
    /**
     * The callback which will be triggered when the `value` of the item changes.
     */
    onChange?: (newValue: T) => void;
    /**
     * The callback that will be triggered when the item loses its focus.
     */
    onBlur?: (event: FormEvent<T>) => void;
    /**
     * The callback which will be triggered should be called when the item is focused.
     */
    onFocus?: (event: FormEvent<T>) => void;
}

/**
 * Interface describing common functions and props that Form.Item Refs has.
 */
export declare interface FormItemRef {
    /**
     * Focuses the item.
     *
     * @example
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const textFieldRef = useRef<Form.TextField>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               textFieldRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" ref={textFieldRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    focus: () => void;
    /**
     * Resets value of the item
     *
     * @remarks
     * If `defaultValue` is defined, calling the `.reset()` function will set `value` to the `defaultValue`.
     *
     * @example
     * ```typescript
     * import { Form, ActionPanel, Action } from "@raycast/api";
     * import { useRef } from "react";
     *
     * export default function Command() {
     *   const textFieldRef = useRef<Form.TextField>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm
     *             title="Submit"
     *             onSubmit={(values) => {
     *               textFieldRef.current?.focus();
     *               console.log("Values", values);
     *             }}
     *           />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="textField" title="Your Name" placeholder="César" ref={textFieldRef} />
     *       <Form.TextArea id="textArea" title="About" placeholder="Enter something about you" />
     *     </Form>
     *   );
     * }
     * ```
     */
    reset: () => void;
}

declare interface FormMembers {
    /**
     * A form item with a checkbox.
     *
     * @example
     * Uncontrolled checkbox
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Answer" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.Checkbox id="answer" label="Are you happy?" defaultValue={true} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled checkbox
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [checked, setChecked] = useState(true);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Answer" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.Checkbox id="answer" label="Do you like orange juice?" value={checked} onChange={setChecked} />
     *     </Form>
     *   );
     * }
     * ```
     */
    Checkbox: typeof Checkbox;
    /**
     * A form item with a date picker.
     *
     * @example
     * Uncontrolled date picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Form" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.DatePicker id="dateOfBirth" title="Date of Birth" defaultValue={new Date(1955, 1, 24)} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled date picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [date, setDate] = useState<Date | null>(null);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Form" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.DatePicker id="launchDate" title="Launch Date" value={date} onChange={setDate} />
     *     </Form>
     *   );
     * }
     * ```
     */
    DatePicker: typeof DatePicker;
    /**
     * A form item with a simple text label.
     *
     * _Do **not** use this component to show validation messages for other form fields._
     *
     * @example
     * Label
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form>
     *       <Form.Description title="Import / Export" text="Exporting will back-up your preferences, quicklinks, snippets, floating notes, script-command folder paths, aliases, hotkeys, favorites and other data." />
     *     </Form>
     *   );
     * }
     * ```
     */
    Description: typeof Description;
    /**
     * A form item with a dropdown menu.
     *
     * @example
     * Uncontrolled dropdown
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.Dropdown id="emoji" title="Favorite Emoji" defaultValue="lol">
     *         <Form.Dropdown.Item value="poop" title="Pile of poop" icon="💩" />
     *         <Form.Dropdown.Item value="rocket" title="Rocket" icon="🚀" />
     *         <Form.Dropdown.Item value="lol" title="Rolling on the floor laughing face" icon="🤣" />
     *       </Form.Dropdown>
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled dropdown
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [programmingLanguage, setProgrammingLanguage] = useState<string>("typescript");
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.Dropdown
     *         id="dropdown"
     *         title="Favorite Language"
     *         value={programmingLanguage}
     *         onChange={setProgrammingLanguage}
     *       >
     *         <Form.Dropdown.Item value="cpp" title="C++" />
     *         <Form.Dropdown.Item value="javascript" title="JavaScript" />
     *         <Form.Dropdown.Item value="ruby" title="Ruby" />
     *         <Form.Dropdown.Item value="python" title="Python" />
     *         <Form.Dropdown.Item value="swift" title="Swift" />
     *         <Form.Dropdown.Item value="typescript" title="TypeScript" />
     *       </Form.Dropdown>
     *     </Form>
     *   );
     * }
     * ```
     */
    Dropdown: typeof Dropdown;
    /**
     * A form item with a secure text field for password-entry in which the entered characters must be kept secret.
     *
     * @example
     * Uncontrolled password field
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitFormAction title="Submit Password" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.PasswordField id="password" title="Enter Password" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled password field
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [password, setPassword] = useState<string>("");
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Password" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.PasswordField id="password" value={password} onChange={setPassword} />
     *     </Form>
     *   );
     * }
     * ```
     */
    PasswordField: typeof PasswordField;
    /**
     * A form item that shows a separator line.
     * Use for grouping and visually separating form items.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form>
     *       <Form.TextField id="textfield" />
     *       <Form.Separator />
     *       <Form.TextArea id="textarea" />
     *     </Form>
     *   );
     * }
     * ```
     */
    Separator: typeof Separator;
    /**
     * A form item with a tag picker that allows the user to select multiple items.
     *
     * @example
     * Uncontrolled tag picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TagPicker id="sports" title="Favorite Sports" defaultValue={["football"]}>
     *         <Form.TagPicker.Item value="basketball" title="Basketball" icon="🏀" />
     *         <Form.TagPicker.Item value="football" title="Football" icon="⚽️" />
     *         <Form.TagPicker.Item value="tennis" title="Tennis" icon="🎾" />
     *       </Form.TagPicker>
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled tag picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [countries, setCountries] = useState<string[]>(["ger", "ned", "pol"]);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Countries" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TagPicker id="countries" title="Visited Countries" value={countries} onChange={setCountries}>
     *         <Form.TagPicker.Item value="ger" title="Germany" icon="🇩🇪" />
     *         <Form.TagPicker.Item value="ind" title="India" icon="🇮🇳" />
     *         <Form.TagPicker.Item value="ned" title="Netherlands" icon="🇳🇱" />
     *         <Form.TagPicker.Item value="nor" title="Norway" icon="🇳🇴" />
     *         <Form.TagPicker.Item value="pol" title="Poland" icon="🇵🇱" />
     *         <Form.TagPicker.Item value="rus" title="Russia" icon="🇷🇺" />
     *         <Form.TagPicker.Item value="sco" title="Scotland" icon="🏴󠁧󠁢󠁳󠁣󠁴󠁿" />
     *       </Form.TagPicker>
     *     </Form>
     *   );
     * }
     * ```
     */
    TagPicker: typeof TagPicker;
    /**
     * A form item with a text area for input.
     * The item supports multiline text entry.
     *
     * @example
     * Uncontrolled text area
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * const DESCRIPTION =
     *   "We spend too much time staring at loading indicators. The Raycast team is dedicated to make everybody interact faster with their computers.";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Description" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextArea id="description" defaultValue={DESCRIPTION} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled text area
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [description, setDescription] = useState<string>("");
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Description" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextArea id="description" value={description} onChange={setDescription} />
     *     </Form>
     *   );
     * }
     * ```
     */
    TextArea: typeof TextArea;
    /**
     * A form item with a text field for input.
     *
     * @example
     * Uncontrolled text field
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Name" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="name" defaultValue="Steve" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled text field
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [name, setName] = useState<string>("");
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Name" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TextField id="name" value={name} onChange={setName} />
     *     </Form>
     *   );
     * }
     * ```
     */
    TextField: typeof TextField;
    /**
     * A form item with a button to open a dialog to pick some files and/or some directories (depending on its props).
     *
     * _While the user picked some items that existed, it might be possible for them to be deleted or changed when the `onSubmit` callback is called. Hence you should always make sure that the items exist before acting on them!_
     *
     * @example
     * Uncontrolled file picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import fs from "fs";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Name" onSubmit={(values) => {
     *               const files = values.files.filter(
     *                 file => fs.existsSync(values.file) && fs.lstatSync(values.file).isFile()
     *               )
     *               // do something with the files
     *             } />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.FilePicker id="files" />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Single selection file picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import fs from "fs";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Name" onSubmit={(values) => {
     *               const file = values.file[0]
     *               if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
     *                 // do something with the file
     *               }
     *             } />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.FilePicker id="file" allowMultipleSelection={false} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Directory picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import fs from "fs";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Name" onSubmit={(values) => {
     *               const file = values.file[0]
     *               if (fs.existsSync(file) && fs.lstatSync(file).isDirectory()) {
     *                 // do something with the directory
     *               }
     *             } />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.FilePicker id="file" allowMultipleSelection={false} canChooseDirectories canChooseFiles={false} />
     *     </Form>
     *   );
     * }
     * ```
     *
     * @example
     * Controlled file picker
     *
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     * import { useState } from "react";
     *
     * export default function Command() {
     *   const [files, setFiles] = useState<string[]>([]);
     *
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Name" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.FilePicker id="files" value={files} onChange={setFiles} />
     *     </Form>
     *   );
     * }
     * ```
     */
    FilePicker: typeof FilePicker;
}

/**
 * A possible form item value that will be used as an input for the submit callback of a form.
 */
export declare type FormValue = string | number | boolean | string[] | number[] | Date | null;

/**
 * Values of items in the form.
 *
 * @remarks
 * For type-safe form values, you can define your own interface. Use the ID's of the form items
 * as the property names. See the example for more details.
 *
 * @example
 * ```typescript
 * import { Form, Action, ActionPanel } from "@raycast/api";
 *
 * interface Values {
 *   todo: string;
 *   due?: Date;
 * }
 *
 * export default function Command() {
 *   function handleSubmit(values: Values) {
 *     console.log(values);
 *   }
 *
 *   return (
 *     <Form
 *        actions={
 *          <ActionPanel>
 *            <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
 *          </ActionPanel>
 *        }
 *     >
 *       <Form.TextField id="todo" title="Todo" />
 *       <Form.DatePicker id="due" title="Due Date" />
 *     </Form>
 *   );
 * };
 * ```
 */
export declare interface FormValues {
    /**
     * The form value of a given item.
     */
    [item: string]: any;
}

export declare type FilePickerRef = FormItemRef;


/**
 * Form.TagPicker Ref type.
 */
export declare type TagPickerRef = FormItemRef;

/**
 * Shows a list of form items such as {@link Form.TextField}, {@link Form.Checkbox} or {@link Form.Dropdown}.
 */
export declare const Form: FunctionComponent<FormProps> & FormMembers;

/**
 * Form.Dropdown Ref type.
 */
export declare type DropdownRef = FormItemRef;

/**
 * See {@link Form.FilePicker}
 */
declare const FilePicker: ForwardRefExoticComponent<FilePickerProps & RefAttributes<FilePickerRef>>;

/**
 * See {@link Form.FilePicker.Props}
 */
export declare interface FilePickerProps extends FormItemProps<string[]> {
    /**
     * Indicates whether it's possible to choose a file.
     * @defaultValue `true`
     */
    canChooseFiles?: boolean;
    /**
     * Indicates whether it's possible to choose a directory.
     * @defaultValue `false`
     */
    canChooseDirectories?: boolean;
    /**
     * Indicates whether the file picker displays files that are normally hidden from the user.
     * @defaultValue `false`
     */
    showHiddenFiles?: boolean;
    /**
     * Indicates whether the user can select multiple items or only one.
     * @defaultValue `true`
     */
    allowMultipleSelection?: boolean;
}

/**
 * See {@link Form.PasswordField}
 */
declare const PasswordField: ForwardRefExoticComponent<PasswordFieldProps & RefAttributes<PasswordFieldRef>>;

/**
 * See {@link Form.PasswordField.Props}
 */
export declare interface PasswordFieldProps extends FormItemProps<string> {
    /**
     * Placeholder text shown in the password field.
     */
    placeholder?: string;
}

/**
 * Form.PasswordField Ref type.
 */
export declare type PasswordFieldRef = FormItemRef;

/**
 * See {@link Form.TagPicker}
 */
declare const TagPicker: ForwardRefExoticComponent<TagPickerProps & RefAttributes<FormItemRef>> & TagPickerMembers;

/**
 * See {@link Form.TagPicker.Item}
 */
declare const TagPickerItem: FunctionComponent<TagPickerItemProps>;

/**
 * See {@link Form.TagPicker.Item.Props}
 */
export declare interface TagPickerItemProps {
    /**
     * Value of the tag.
     * Make sure to assign unique value for each item.
     */
    value: string;
    /**
     * The display title of the tag.
     */
    title: string;
    /**
     * An icon to show in the tag.
     */
    icon?: Image.ImageLike;
}

declare interface TagPickerMembers {
    /**
     * A tag picker item in a {@link Form.TagPicker}.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Color, Form, Icon, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Color" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.TagPicker id="color" title="Color">
     *         <Form.TagPicker.Item value="red" title="Red" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
     *         <Form.TagPicker.Item value="green" title="Green" icon={{ source: Icon.Circle, tintColor: Color.Green }} />
     *         <Form.TagPicker.Item value="blue" title="Blue" icon={{ source: Icon.Circle, tintColor: Color.Blue }} />
     *       </Form.TagPicker>
     *     </Form>
     *   );
     * }
     * ```
     */
    Item: typeof TagPickerItem;
}

/**
 * See {@link Form.TagPicker.Props}
 */
export declare interface TagPickerProps extends FormItemProps<string[]> {
    /**
     * The list of tags.
     */
    children?: ReactNode;
    /**
     * Placeholder text shown in the token field.
     */
    placeholder?: string;
}

/**
 * See {@link Form.TextArea}
 */
declare const TextArea: ForwardRefExoticComponent<TextAreaProps & RefAttributes<TextAreaRef>>;

/**
 * See {@link Form.TextArea.Props}
 */
export declare interface TextAreaProps extends FormItemProps<string> {
    /**
     * Placeholder text shown in the text area.
     */
    placeholder?: string;
    /**
     * Whether markdown will be highlighted in the TextArea or not.
     * When enabled, markdown shortcuts starts to work for the TextArea (pressing `⌘ + B` will add `**bold**` around the selected text, `⌘ + I` will make the selected text italic, etc.)
     * @defaultValue `false`
     */
    enableMarkdown?: boolean;
}

/**
 * Form.TextArea Ref type.
 */
export declare type TextAreaRef = FormItemRef;

/**
 * See {@link Form.TextField}
 */
declare const TextField: ForwardRefExoticComponent<TextFieldProps & RefAttributes<TextFieldRef>>;

/**
 * See {@link Form.TextField.Props}
 */
export declare interface TextFieldProps extends FormItemProps<string> {
    /**
     * Placeholder text shown in the text field.
     */
    placeholder?: string;
}

export declare type TextFieldRef = FormItemRef;

/**
 * See {@link Form.DatePicker}
 */
declare const DatePicker: ForwardRefExoticComponent<DatePickerProps & RefAttributes<FormItemRef>> & DatePickerMembers;

export declare interface DatePickerMembers {
    /**
     * The types of date components the user can pick
     * * `Date` - only year, month, and day can be picked
     * * `DateTime` - hour and second can be picked in addition to year, month and day
     */
    Type: typeof DatePickerType;
}

export declare interface DatePickerProps extends FormItemProps<Date | null> {
    /**
     * Indicates what types of date components can be picked
     *
     * Defaults to {@link Form.DatePicker.Type.DateTime}
     */
    type?: DatePickerType;
}

/**
 * Form.DatePicker Ref type.
 */
export declare type DatePickerRef = FormItemRef;

/**
 * See {@link Form.DatePicker.Type}, {@link Action.PickDate.Type}
 */
export declare enum DatePickerType {
    /**
     * Only year, month, and day can be picked
     */
    Date = "date",
    /**
     * hour and second can be picked in addition to year, month and day
     */
    DateTime = "date_time"
}

/**
 * A form item with a simple text label.
 *
 * _Do **not** use this component to show validation messages for other form fields._
 *
 * @example
 * Label
 *
 * ```typescript
 * import { ActionPanel, Form, Action } from "@raycast/api";
 *
 * export default function Command() {
 *   return (
 *     <Form
 *       actions={
 *         <ActionPanel>
 *           <Action.SubmitForm title="Submit" onSubmit={(values) => console.log(values)} />
 *         </ActionPanel>
 *       }
 *     >
 *       <Form.Description title="Import / Export" text="Exporting will back-up your preferences, quicklinks, snippets, floating notes, script-command folder paths, aliases, hotkeys, favorites and other data." />
 *     </Form>
 *   );
 * }
 * ```
 */
declare const Description: FunctionComponent<DescriptionProps>;

/**
 * Props of the {@link Form.Description} React component.
 */
export declare interface DescriptionProps {
    /**
     * The display title of the left side from the description item.
     */
    title?: string;
    /**
     * Text that will be displayed in the middle.
     */
    text: string;
}

/**
 * See {@link Form.Checkbox}
 */
declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<CheckboxRef>>;

/**
 * See {@link Form.Checkbox.Props}
 */
export declare interface CheckboxProps extends FormItemProps<boolean> {
    /**
     * The label displayed on the right side of the checkbox.
     */
    label: string;
}

/**
 * Form.Checkbox Ref type.
 */
export declare type CheckboxRef = FormItemRef;