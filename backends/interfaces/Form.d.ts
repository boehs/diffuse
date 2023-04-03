import { FormValue, FormItemProps, FormValues, FormProps, FormItemRef, FormEvent, FormEventType, TextFieldRef, TextFieldProps, PasswordFieldRef, PasswordFieldProps, TextAreaRef, TextAreaProps, DescriptionProps, SeparatorProps, CheckboxRef, CheckboxProps, DatePickerRef, DatePickerProps, DatePickerType, DropdownRef, DropdownProps, DropdownSectionProps, DropdownItemProps, TagPickerProps, TagPickerItemProps, FilePickerRef, FilePickerProps } from '.';

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
 * Form.TagPicker Ref type.
 */
export declare type TagPickerRef = FormItemRef;