import {
    ActionStyle,
    Form,
    DatePickerMembers,
    DatePickerType,
    Image,
    Keyboard,
    Clipboard,
    Application,
} from '.';
import { FunctionComponent, ReactNode } from 'react'
import { PathLike } from 'fs';


export declare namespace Action {
    export type Props = ActionProps;
    export type Style = ActionStyle;
    export namespace CopyToClipboard {
        /**
         * Props of the {@link Action.CopyToClipboard} React component.
         */
        export type Props = CopyToClipboardProps;
    }
    export namespace CreateQuicklink {
        /**
         * Props of the {@link Action.CreateQuicklink} React component.
         */
        export type Props = CreateQuicklinkProps;
    }
    export namespace CreateSnippet {
        /**
         * Props of the {@link Action.CreateSnippet} React component.
         */
        export type Props = CreateSnippetProps;
    }
    export namespace Open {
        /**
         * Props of the {@link Action.Open} React component.
         */
        export type Props = OpenProps;
    }
    export namespace OpenInBrowser {
        /**
         * Props of the {@link Action.OpenInBrowser} React component.
         */
        export type Props = OpenInBrowserProps;
    }
    export namespace OpenWith {
        /**
         * Props of the {@link Action.OpenWith} React component.
         */
        export type Props = OpenWithProps;
    }
    export namespace Paste {
        /**
         * Props of the {@link Action.Paste} React component.
         */
        export type Props = PasteProps;
    }
    export namespace Push {
        /**
         * Props of the {@link Action.Push} React component.
         */
        export type Props = PushProps;
    }
    export namespace ShowInFinder {
        /**
         * Props of the {@link Action.ShowInFinder} React component.
         */
        export type Props = ShowInFinderProps;
    }
    export namespace SubmitForm {
        /**
         * Props of the {@link Action.SubmitForm} React component.
         */
        export type Props<T extends Form.Values> = SubmitFormProps<T>;
    }
    export namespace Trash {
        /**
         * Props of the {@link Action.Trash} React component.
         */
        export type Props = TrashProps;
    }
    export namespace ToggleQuickLook {
        /**
         * Props of the {@link Action.ToggleQuickLook} React component.
         */
        export type Props = ToggleQuickLookProps;
    }
    export namespace PickDate {
        /**
         * Props of the {@link Action.PickDate} React component.
         */
        export type Props = PickDateProps;
        /**
         * The types of date components the user can pick
         * * `Date` - only year, month, and day can be picked
         * * `DateTime` - hour and second can be picked in addition to year, month and day
         */
        export type Type = DatePickerType;
    }
}

/**
 * A context-specific action that can be performed by the user.
 *
 * @remarks
 * Assign keyboard shortcuts to items to make it easier for users to perform frequently used actions.
 *
 * @example
 * ```typescript
 * import { ActionPanel, Action, List } from "@raycast/api";
 *
 * export default function Command() {
 *   return (
 *     <List navigationTitle="Open Pull Requests">
 *       <List.Item
 *         title="Docs: Update API Reference"
 *         subtitle="#1"
 *         actions={
 *           <ActionPanel title="#1 in raycast/extensions">
 *             <Action.OpenInBrowser url="https://github.com/raycast/extensions/pull/1" />
 *             <Action.CopyToClipboard title="Copy Pull Request Number" content="#1" />
 *             <Action title="Close Pull Request" onAction={() => console.log("Close PR #1")} />
 *           </ActionPanel>
 *         }
 *       />
 *     </List>
 *   );
 * }
 * ```
 */
export declare const Action: FunctionComponent<ActionProps> & ConvenienceActions & {
    Style: typeof ActionStyle;
};

/**
 * Props of the {@link Action} React component.
 */
declare interface ActionProps {
    /**
     * The title displayed for the Action.
     */
    title: string;
    /**
     * The icon displayed for the Action.
     */
    icon?: Image.ImageLike | undefined | null;
    /**
     * Defines the visual style of the Action.
     *
     * @remarks
     * Use {@link Action.Style.Regular} for displaying a regular actions.
     * Use {@link Action.Style.Destructive} when your action has something that user should be careful about.
     * Use the confirmation {@link Alert} if the action is doing something that user cannot revert.
     * @defaultValue {@link Action.Style.Regular}
     */
    style?: ActionStyle;
    /**
     * The keyboard shortcut for the Action.
     *
     * @remarks
     * The first and second action in an {@link ActionPanel} become the primary and secondary action. They automatically get the default keyboard shortcuts assigned.
     * In {@link List}, {@link Grid} ,and {@link Detail}, this is `↵` for the primary and `⌘` `↵` for the secondary action. In {@link Form} it's `⌘` `↵` for the primary and `⌘` `⇧` `↵` for the secondary.
     * Keep in mind that while you can specify an alternative shortcut for the primary and secondary actions, it won't be displayed in the Action Panel.
     */
    shortcut?: Keyboard.Shortcut | undefined | null;
    /**
     * Callback that is triggered when the Action is selected.
     */
    onAction?: () => void;
    /**
     * Indicates whether the Action should be focused automatically when the parent ActionPanel (or Actionpanel.Submenu) opens.
     */
    autoFocus?: boolean;
    /**
     * @internal
     * Some actions require some custom integration on the native side. That's how we recognise them
     */
    type?: "submit-form" | "date-picker" | "date-time-picker";
}

declare interface ConvenienceActions {
    /**
     * Action that copies the content to the clipboard.
     *
     * @remarks
     * The main window is closed, and a HUD is shown after the content was copied to the clipboard.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Action, Detail } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Press `⌘ + .` and share some love."
     *       actions={
     *         <ActionPanel>
     *           <Action.CopyToClipboard content="I ❤️ Raycast" shortcut={{ modifiers: ["cmd"], key: "." }} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    CopyToClipboard: typeof CopyToClipboard;
    /**
     * An action to open a file or folder with a specific application, just as if you had double-clicked the
     * file's icon.
     *
     * @remarks
     * The main window is closed after the file is opened.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Check out your extension code."
     *       actions={
     *         <ActionPanel>
     *           <Action.Open title="Open Folder" target={__dirname} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    Open: typeof Open;
    /**
     * Action that opens a URL in the default browser.
     *
     * @remarks
     * The main window is closed after the URL is opened in the browser.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Join the gang!"
     *       actions={
     *         <ActionPanel>
     *           <Action.OpenInBrowser url="https://raycast.com/jobs" />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    OpenInBrowser: typeof OpenInBrowser;
    /**
     * Action that opens a file or folder with a specific application.
     *
     * @remarks
     * The action opens a sub-menu with all applications that can open the file or folder.
     * The main window is closed after the file is opened in the specified application.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     * import { homedir } from "os";
     *
     * const DESKTOP_DIR = `${homedir()}/Desktop`;
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="What do you want to use to open your desktop with?"
     *       actions={
     *         <ActionPanel>
     *           <Action.OpenWith path={DESKTOP_DIR} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    OpenWith: typeof OpenWith;
    /**
     * Action that pastes the content to the front-most applications.
     *
     * @remarks
     * The main window is closed after the content is pasted to the front-most application.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Let us know what you think about the Raycast API?"
     *       actions={
     *         <ActionPanel>
     *           <Action.Paste content="api@raycast.com" />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    Paste: typeof Paste;
    /**
     * Action that pushes a new view to the navigation stack.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * function Ping() {
     *   return (
     *     <Detail
     *       markdown="Ping"
     *       actions={
     *         <ActionPanel>
     *           <Action.Push title="Push Pong" target={<Pong />} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     *
     * function Pong() {
     *   return <Detail markdown="Pong" />;
     * }
     *
     * export default function Command() {
     *   return <Ping />;
     * }
     * ```
     */
    Push: typeof Push;
    /**
     * Action that shows a file or folder in the Finder.
     *
     * @remarks
     * The main window is closed after the file or folder is revealed in the Finder.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     * import { homedir } from "os";
     *
     * const DOWNLOADS_DIR = `${homedir()}/Downloads`;
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Are your downloads pilling up again?"
     *       actions={
     *         <ActionPanel>
     *           <Action.ShowInFinder path={DOWNLOADS_DIR} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    ShowInFinder: typeof ShowInFinder;
    /**
     * Action that adds a submit handler for capturing form values.
     *
     * @example
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
    SubmitForm: typeof SubmitForm;
    /**
     * Action that moves a file or folder to the Trash.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     * import { homedir } from "os";
     *
     * const FILE = `${homedir()}/Downloads/get-rid-of-me.txt`;
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Some spring cleaning?"
     *       actions={
     *         <ActionPanel>
     *           <Action.Trash paths={FILE} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    Trash: typeof Trash;
    /**
     * Action that navigates to the the Create Snippet command with some or all of the fields prefilled.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Test out snippet creation"
     *       actions={
     *         <ActionPanel>
     *           <Action.CreateSnippet snippet={{ text: "DE75512108001245126199" }} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    CreateSnippet: typeof CreateSnippet;
    /**
     * Action that navigates to the the Create Quicklink command with some or all of the fields prefilled.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail
     *       markdown="Test out quicklink creation"
     *       actions={
     *         <ActionPanel>
     *           <Action.CreateQuicklink quicklink={{ link: "https://duckduckgo.com/?q={Query}" }} />
     *         </ActionPanel>
     *       }
     *     />
     *   );
     * }
     * ```
     */
    CreateQuicklink: typeof CreateQuicklink;
    /**
     * Action that toggles the Quick Look to preview a file.
     *
     * @example
     * ```typescript
     * import { ActionPanel, List, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *         <List.Item
     *           title="Preview me"
     *           quickLook={{ path: "~/Downloads/Raycast.dmg", name: "Some file" }}
     *           actions={
     *             <ActionPanel>
     *               <Action.ToggleQuickLook shortcut={{ modifiers: ["cmd"], key: "y" }} />
     *             </ActionPanel>
     *           }
     *         />
     *     </ List>
     *   );
     * }
     * ```
     */
    ToggleQuickLook: typeof ToggleQuickLook;
    /**
     * Action to pick a date.
     *
     * @example
     * ```typescript
     * import { ActionPanel, List, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *         <List.Item
     *           title="Todo"
     *           actions={
     *             <ActionPanel>
     *               <Action.PickDate title="Set Due Date…" />
     *             </ActionPanel>
     *           }
     *         />
     *     </ List>
     *   );
     * }
     * ```
     */
    PickDate: typeof PickDate;
}

/**
 * See {@link Action.CopyToClipboard}
 */
declare const CopyToClipboard: FunctionComponent<CopyToClipboardProps>;

/**
 * See {@link Action.CopyToClipboard.Props}
 */
declare interface CopyToClipboardProps {
    /**
     * The contents that will be copied to the clipboard.
     */
    content: string | number | Clipboard.Content;
    /**
     * An optional title for the Action.
     * @defaultValue `"Copy to Clipboard"`
     */
    title?: string;
    /**
     * A optional icon displayed for the Action.
     * @defaultValue {@link Icon.Clipboard}
     */
    icon?: Image.ImageLike;
    /**
     * Indicates whether the content should be copied to the clipboard temporarily or not.
     * @defaultValue false
     */
    transient?: boolean;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the content was copied to clipboard.
     *
     * @remarks
     * This is handy when you want to act on the copied content, e.g. up-rank recently copied content.
     */
    onCopy?: (content: string | number | Clipboard.Content) => void;
}

/**
 * See {@link Action.CreateQuicklink}
 */
declare const CreateQuicklink: FunctionComponent<CreateQuicklinkProps>;

declare interface CreateQuicklinkProps {
    /**
     * The {@link Quicklink} to create.
     */
    quicklink: Quicklink;
    /**
     * An optional title for the Action.
     */
    title?: string;
    /**
     * A optional icon displayed for the Action. See {@link Image.ImageLike} for the supported formats and types.
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
}

/**
 * See {@link Action.CreateQuicklink}
 */
declare const CreateSnippet: FunctionComponent<CreateSnippetProps>;

declare interface CreateSnippetProps {
    snippet: Snippet;
    /**
     * An optional title for the Action.
     */
    title?: string;
    /**
     * A optional icon displayed for the Action. See {@link Image.ImageLike} for the supported formats and types.
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
}

/**
 * See {@link Action.OpenInBrowser}
 */
declare const OpenInBrowser: FunctionComponent<OpenInBrowserProps>;

/**
 * See {@link Action.OpenInBrowser.Props}
 */
declare interface OpenInBrowserProps {
    /**
     * The URL to open.
     */
    url: string;
    /**
     * An optional title for the Action.
     * @defaultValue `"Open in Browser"`
     */
    title?: string;
    /**
     * The icon displayed for the Action.
     * @defaultValue {@link Icon.Globe}
     */
    icon?: Image.ImageLike;
    /**
     * The optional keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the URL was opened in the browser.
     *
     * @remarks
     * This is handy when you want to act on the opened link, e.g. store a history of visited links.
     */
    onOpen?: (url: string) => void;
}

/**
 * See {@link Action.Open.Props}
 */
declare interface OpenProps {
    /**
     * The file, folder or URL to open.
     */
    target: string;
    /**
     * The application name to use for opening the file.
     *
     * @remarks
     * If no application is specified, the default application as determined by the system is used to open the
     * specified file. Note that you can use the application name, app identifier, or absolute path to the app.
     */
    application?: Application | string;
    /**
     * The title for the Action.
     */
    title: string;
    /**
     * The icon displayed for the Action.
     * @defaultValue {@link Icon.Finder}
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the file or folder was opened.
     *
     * @remarks
     * This is handy when you want to act on an opened file or folder, e.g. store a history of opened items.
     */
    onOpen?: (target: string) => void;
}

/**
 * See {@link Action.OpenWith}
 */
declare const OpenWith: FunctionComponent<OpenWithProps>;

/**
 * See {@link Action.OpenWith.Props}
 */
declare interface OpenWithProps {
    /**
     * The path to open.
     */
    path: string;
    /**
     * The title for the Action.
     * @defaultValue `"Open With"`
     */
    title?: string;
    /**
     * The icon displayed for the Action.
     * @defaultValue {@link Icon.Upload}
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the file or folder was opened.
     *
     * @remarks
     * This is handy when you want to act on an opened file or folder, e.g. store a history of opened items.
     */
    onOpen?: (path: string) => void;
}

/**
 * See {@link Action.Open}
 */
declare const Open: FunctionComponent<OpenProps>;

/**
 * See {@link Action.ShowInFinder.Props}
 */
declare const ShowInFinder: FunctionComponent<ShowInFinderProps>;

/**
 * See {@link Action.ShowInFinder.Props}
 */
declare interface ShowInFinderProps {
    /**
     * The path to open.
     */
    path: PathLike;
    /**
     * An optional title for the Action.
     * @defaultValue `"Show in Finder"`
     */
    title?: string;
    /**
     * A optional icon displayed for the Action.
     * @defaultValue {@link Icon.Finder}
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the file or folder was shown in the Finder.
     *
     * @remarks
     * This is handy when you want to act on revealed files or folders, e.g. up-rank recently opened items.
     */
    onShow?: (path: PathLike) => void;
}

/**
 * See {@link Action.ToggleQuickLook}
 */
declare const ToggleQuickLook: FunctionComponent<ToggleQuickLookProps>;

/**
 * See {@link Action.ToggleQuickLook.Props}
 */
declare interface ToggleQuickLookProps {
    /**
     * The title for the Action.
     * @defaultValue `"Quick Look"`
     */
    title?: string;
    /**
     * The icon displayed for the Action.
     * @defaultValue {@link Icon.Eye}
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     *
     * @remarks
     * The recommended system-wide keyboard shortcut is "⌘ + Y".
     */
    shortcut?: Keyboard.Shortcut;
}

/**
 * See {@link Action.Trash}
 */
declare const Trash: FunctionComponent<TrashProps>;

/**
 * See {@link Action.Trash.Props}
 */ 
declare interface TrashProps {
    /**
     * The item or items to move to the trash.
     */
    paths: PathLike | PathLike[];
    /**
     * An optional title for the Action.
     * @defaultValue `"Move to Trash"`
     */
    title?: string;
    /**
     * A optional icon displayed for the Action.
     * @defaultValue {@link Icon.Trash}
     */
    icon?: Image.ImageLike;
    /**
     * The optional keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when all items were moved to the trash.
     *
     * @remarks
     * This is handy when you want to act on a trashed item, e.g. update a list.
     * The callback returns the same `paths` as passed originally.
     */
    onTrash?: (paths: PathLike | PathLike[]) => void;
}

/**
 * See {@link Action.PickDate}
 */
declare const PickDate: FunctionComponent<PickDateProps> & DatePickerMembers;

/**
 * See {@link Action.PickDate.Props}
 */
declare interface PickDateProps {
    /**
     * A title for the Action.
     */
    title: string;
    /**
     * A optional icon displayed for the Action.
     * @defaultValue {@link Icon.Calendar}
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the Date was picked
     */
    onChange: (date: Date | null) => void;
    /**
     * Indicates what types of date components can be picked
     *
     * Defaults to {@link Action.PickDate.Type.DateTime}
     */
    type?: DatePickerType;
}

/**
 * See {@link Action.SubmitForm.Props}
 */
declare const SubmitForm: {
    <T extends Form.Values>(props: SubmitFormProps<T>): JSX.Element;
    displayName: string;
};

/**
 * See {@link Action.SubmitForm.Props}
 */
declare interface SubmitFormProps<T extends Form.Values> {
    /**
     * The title displayed for the Action.
     * @defaultValue `"Submit Form"`
     */
    title?: string;
    /**
     * The icon displayed for the Action.
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the Form was submitted.
     * The handler receives a the values object containing the user input.
     *
     * @returns You can optionally return `false` to indicate that the submit action failed. Raycast will show some subtle feedback to the user that something went wrong. Pair it with the Form inputs' `validation` for a top-notch user experience.
     *
     * _If a user has the Accessibility setting 'Reduce Motion' enabled, Raycast won't show the feedback._
     */
    onSubmit?: (input: T) => void | boolean | Promise<void | boolean>;
}

/**
 * See {@link Action.Paste.Props}
 */
declare const Paste: FunctionComponent<PasteProps>;

/**
 * See {@link Action.Paste.Props}
 */
declare interface PasteProps {
    /**
     * The contents that will be pasted to the frontmost application.
     */
    content: string | number | Clipboard.Content;
    /**
     * An optional title for the Action.
     * @defaultValue `"Paste in Active App"`
     */
    title?: string;
    /**
     * The icon displayed for the Action.
     * @defaultValue {@link Icon.Clipboard}
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the content was pasted into the front-most application.
     *
     * @remarks
     * This is handy when you want to act on the pasted content, e.g. up-rank recently pasted content.
     */
    onPaste?: (content: string | number | Clipboard.Content) => void;
}

/**
 * See {@link Action.Push.Props}
 */
declare const Push: FunctionComponent<PushProps>;

/**
 * See {@link Action.Push.Props}
 */
declare interface PushProps {
    /**
     * The title displayed for the Action.
     */
    title: string;
    /**
     * The target view that will be pushed to the navigation stack.
     */
    target: ReactNode;
    /**
     * The icon displayed for the Action.
     */
    icon?: Image.ImageLike;
    /**
     * The keyboard shortcut for the Action.
     */
    shortcut?: Keyboard.Shortcut;
    /**
     * Callback when the target view was pushed.
     *
     * @remarks
     * This is handy when you want to act on the pushed target view, e.g. uprank a selected list item.
     */
    onPush?: () => void;
}

declare interface Quicklink {
    /**
     * The URL or file path, optionally including placeholders such as in "https://google.com/search?q=\{Query\}"
     */
    link: string;
    /**
     * The quicklink name
     */
    name?: string;
    /**
     * The application that the quicklink should be opened in.
     */
    application?: string | Application;
}

declare interface Snippet {
    /**
     * The snippet contents.
     */
    text: string;
    /**
     * The snippet name.
     */
    name?: string;
    /**
     * The keyword to trigger the snippet.
     */
    keyword?: string;
}