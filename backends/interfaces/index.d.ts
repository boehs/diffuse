// Extracted from https://www.npmjs.com/package/@raycast/api?activeTab=code
// Copyright Raycast
// All deprecated APIs have been removed.
// All AI functionality has been removed.
// v1.49.1

import { PathLike } from 'fs';
import { ReactNode, RefAttributes, ReactElement, FunctionComponent, ForwardRefExoticComponent } from 'react';
import { Icon } from './icon';
import { ActionPanel } from './ActionPanel';

/**
 * Components that support an Action Panel.
 */
declare interface ActionsInterface {
    /**
     * A reference to an {@link ActionPanel}.
     */
    actions?: ReactNode;
}

/**
 * Defines the visual style of the Action.
 *
 * @remarks
 * Use {@link Action.Style.Regular} for displaying a regular actions.
 * Use {@link Action.Style.Destructive} when your action has something that user should be careful about.
 * Use the confirmation {@link Alert} if the action is doing something that user cannot revert.
 */
export declare enum ActionStyle {
    Regular = "regular",
    Destructive = "destructive"
}

export declare namespace Alert {
    /**
     * The options to create an {@link Alert}.
     *
     * @example
     * ```typescript
     * import { confimrAlert, Alert } from "@raycast/api";
     *
     * export default async () => {
     *   const options: Alert.Options = {
     *     title: "Finished cooking",
     *     message: "Delicious pasta for lunch",
     *     primaryAction: {
     *       title: 'Do something',
     *       onAction: () => {
     *         // while you can register a handler for an action, it's more elegant
     *         // to use the `if (await confirmAlert(...)) { ... }` pattern
     *         console.log("The alert action has been triggered")
     *       }
     *     }
     *   };
     *   await confirmAlert(options);
     * };
     * ```
     */
    export interface Options {
        /**
         * The icon of an alert to illustrate the action. Displayed on the top.
         */
        icon?: Image.ImageLike;
        /**
         * The title of an alert. Displayed below the icon.
         */
        title: string;
        /**
         * An additional message for an Alert. Useful to show more information, e.g. a confirmation message for a destructive action.
         */
        message?: string;
        /**
         * The primary Action the user can take.
         */
        primaryAction?: ActionOptions;
        /**
         * The Action to dismiss the alert. There usually shouldn't be any side effects when the user takes this action.
         */
        dismissAction?: ActionOptions;
    }
    /**
     * The options to create an {@link Alert} Action.
     */
    export interface ActionOptions {
        /**
         * The title of the action.
         */
        title: string;
        /**
         * The style of the action.
         */
        style?: ActionStyle;
        /**
         * A callback called when the action is triggered.
         */
        onAction?: () => void;
    }
    /**
     * Defines the visual style of an Action of the Alert.
     *
     * @remarks
     * Use {@link Alert.ActionStyle.Default} for confirmations of a positive action.
     * Use {@link Alert.ActionStyle.Destructive} for confirmations of a destructive action (eg. deleting a file).
     */
    export enum ActionStyle {
        Default = "DEFAULT",
        Cancel = "CANCEL",
        Destructive = "DESTRUCTIVE"
    }
}

/**
 * An object that represents a locally installed application on the system.
 *
 * @remarks
 * It can be used to open files or folders in a specific application. Use {@link getApplications} or
 * {@link getDefaultApplication} to get applications that can open a specific file or folder.
 */
export declare interface Application {
    /**
     * The display name of the application.
     */
    name: string;
    /**
     * The absolute path to the application bundle, e.g. `/Applications/Raycast.app`,
     */
    path: string;
    /**
     * The bundle identifier of the application, e.g. `com.raycast.macos`.
     */
    bundleId?: string;
}

/**
 * A record type holding the arguments (entered in Raycast Root Search Bar) that have been passed to the command.
 */
declare interface Arguments {
    /**
     * The representation of arguments given that key here is the `name` defined in manifest file and value is the user's input
     */
    [item: string]: any;
}

/**
 * Caching abstraction that stores data on disk and supports LRU (least recently used) access.
 * Since extensions can only consume up to a max. heap memory size, the cache only maintains a lightweight index in memory
 * and stores the actual data in separate files on disk in the extension's support directory.
 *
 * The Cache class provides CRUD-style methods (get, set, remove) to update and retrieve data synchronously based on a key.
 * The data must be a string and it is up to the client to decide which serialization format to use.
 * A typical use case would be to use `JSON.stringify` and `JSON.parse`.
 *
 * @remarks By default, the cache is shared between the commands of an extension. Use {@link Cache.Options} to configure
 * a `namespace` per command if needed (for example, set it to `environment.commandName`).
 *
 * @example
 * ```typescript
 * import { Cache } from "@raycast/api";
 *
 * const cache = new Cache();
 * cache.set("items", JSON.stringify([{ id: "1", title: "Item 1" }]));
 * console.log(JSON.parse(cache.get("items")));
 * ```
 */
export declare class Cache {
    static get STORAGE_DIRECTORY_NAME(): string;
    static get DEFAULT_CAPACITY(): number;
    private directory;
    private namespace?;
    private capacity;
    private journal;
    private storage;
    private subscribers;
    constructor(options?: Cache.Options);
    /**
     * @returns the full path to the directory where the data is stored on disk.
     */
    get storageDirectory(): string;
    /**
     * @returns the data for the given key. If there is no data for the key, `undefined` is returned.
     * @remarks If you want to just check for the existence of a key, use {@link has}.
     */
    get(key: string): string | undefined;
    /**
     * @returns `true` if data for the key exists, `false` otherwise.
     * @remarks You can use this method to check for entries without affecting the LRU access.
     */
    has(key: string): boolean;
    /**
     * @returns `true` if the cache is empty, `false` otherwise.
     */
    get isEmpty(): boolean;
    /**
     * Sets the data for the given key.
     * If the data exceeds the configured `capacity`, the least recently used entries are removed.
     * This also notifies registered subscribers (see {@link subscribe}).
     */
    set(key: string, data: string): void;
    /**
     * Removes the data for the given key.
     * This also notifies registered subscribers (see {@link subscribe}).
     * @returns `true` if data for the key was removed, `false` otherwise.
     */
    remove(key: string): boolean;
    /**
     * Clears all stored data.
     * This also notifies registered subscribers (see {@link subscribe}) unless the  `notifySubscribers` option is set to `false`.
     */
    clear(options?: {
        notifySubscribers: boolean;
    }): void;
    /**
     * Registers a new subscriber that gets notified when cache data is set or removed.
     * @returns a function that can be called to remove the subscriber.
     */
    subscribe(subscriber: Cache.Subscriber): Cache.Subscription;
    private maintainCapacity;
    private notifySubscribers;
}

export declare namespace Cache {
    /**
     * The options for creating a new {@link Cache}.
     */
    export interface Options {
        /**
         * If set, the Cache will be namespaced via a subdirectory.
         * This can be useful to separate the caches for individual commands of an extension.
         * By default, the cache is shared between the commands of an extension.
         */
        namespace?: string;
        directory?: string;
        /**
         * The capacity in bytes. If the stored data exceeds the capacity, the least recently used data is removed.
         * The default capacity is 10 MB.
         */
        capacity?: number;
    }
    export type Subscriber = (key: string | undefined, data: string | undefined) => void;
    export type Subscription = () => void;
}

/**
 * See {@link Form.Checkbox}
 */
declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<CheckboxRef>>;

/**
 * See {@link Form.Checkbox.Props}
 */
declare interface CheckboxProps extends FormItemProps<boolean> {
    /**
     * The label displayed on the right side of the checkbox.
     */
    label: string;
}

/**
 * Form.Checkbox Ref type.
 */
declare type CheckboxRef = FormItemRef;

/**
 * Clear the text in the search bar.
 *
 * @param options - Can be used to force scrolling to the top. Defaults to scrolling to the top after the
 * the search bar was cleared.
 * @returns A Promise that resolves when the search bar is cleared.
 */
export declare function clearSearchBar(options?: {
    forceScrollToTop?: boolean;
}): Promise<void>;

export declare namespace Clipboard {
    /**
     * Copies content to the clipboard.
     *
     * @param content - The content to copy to the clipboard.
     * @param options - Options for the copy operation.
     * @returns A Promise that resolves when the content is copied to the clipboard.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * export default async () => {
     *   await Clipboard.copy("https://raycast.com");
     *
     *   const textContent: Clipboard.Content = {
     *     text: "https://raycast.com",
     *   }
     *
     *   await Clipboard.copy(textContent);
     *
     *   const fileContent: Clipboard.Content = {
     *     file: "/path/to/file.pdf",
     *   }
     *
     *   await Clipboard.copy(fileContent);
     *
     *   await Clipboard.copy("SecretPassword", { transient: true });
     * };
     * ```
     */
    export function copy(content: string | number | Content, options?: CopyOptions): Promise<void>;
    /**
     * Clears the current clipboard contents.
     *
     * @returns A Promise that resolves when the clipboard is cleared.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * export default async () => {
     *   await Clipboard.clear();
     * };
     * ```
     */
    export function clear(): Promise<void>;
    /**
     * Pastes content to the current selection of the frontmost application.
     *
     * @param content - The content to insert at the cursor.
     * @returns A Promise that resolves when the content is pasted.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * export default async () => {
     *   await Clipboard.paste("I really like Raycast's API");
     * };
     * ```
     */
    export function paste(content: string | number | Content): Promise<void>;
    /**
     * Reads the clipboard content as plain text, file name, or HTML.
     *
     * @returns A Promise that resolves when the clipboard content was read.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * export default async () => {
     *   const { text, file, html } = await Clipboard.read();
     *   console.log(text);
     *   console.log(file);
     *   console.log(html);
     * };
     * ```
     */
    export function read(): Promise<ReadContent>;
    /**
     * Reads the clipboard as plain text.
     *
     * @returns A promise that resolves when the clipboard content was read as plain text.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * export default async () => {
     *   const text = await Clipboard.readText();
     *   console.log(text);
     * };
     * ```
     */
    export function readText(): Promise<string | undefined>;
    /**
     * Type of the content read from the {@link Clipboard}.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * const content: Clipboard.ReadContent = {
     *  text: "filename.pdf",
     *  file: "/path/to/filename.pdf",
     *  html: "<a href='/path/to/filename.pdf'>filename.pdf</p>",
     * }
     * ```
     */
    export type ReadContent = {
        text: string;
        file?: string;
        html?: string;
    };
    /**
     * Type of the content copied and pasted to and from the {@link Clipboard}.
     *
     * @example
     * ```typescript
     * import { Clipboard } from "@raycast/api";
     *
     * const textContent: Clipboard.Content = {
     *   text: "text to copy",
     * }
     *
     * const fileContent: Clipboard.Content = {
     *   file: "/path/to/file.pdf",
     * }
     * ```
     */
    export type Content = {
        /**
         * The text representation of the content.
         */
        text: string;
    } | {
        /**
         * The file representation of the content.
         */
        file: PathLike;
    } | {
        /**
         * The HTML representation of the content.
         */
        html: string;
        /**
         * The alternative text representation of the content.
         */
        text?: string;
    };
    export type CopyOptions = {
        /**
         * Indicates whether the content should be copied to the clipboard temporarily or not.
         */
        transient: boolean;
    };
}

/**
 * Closes the main Raycast window.
 *
 * @param options - A parameter object with the properties:
 * `clearRootSearch`: clears the text in the root search bar and scrolls to the top; default is `false`
 * `popToRootType`: defines the pop to root behavior ({@link PopToRootType}); the default is to to respect the user's "Pop to Root Search" preference in Raycast
 * @returns A Promise that resolves when the main window is closed.
 *
 * @example
 * ```typescript
 * import { closeMainWindow } from "@raycast/api";
 * import { setTimeout } from "timers/promises";
 *
 * export default async () => {
 *   await setTimeout(1000);
 *   await closeMainWindow({ clearRootSearch: true });
 * };
 * ```
 */
export declare function closeMainWindow(options?: {
    clearRootSearch?: boolean;
    popToRootType?: PopToRootType;
}): Promise<void>;

/**
 * The standard colors. Use those colors for consistency.
 *
 * @remarks
 * The colors automatically adapt to the Raycast theme (light or dark).
 *
 * @example
 * ```typescript
 * import { Color, Icon, List } from "@raycast/api";
 *
 * export default function Command() {
 *  return (
 *  <List>
 *    <List.Item title="Blue" icon={{ source: Icon.Circle, tintColor: Color.Blue }} />
 *    <List.Item title="Green" icon={{ source: Icon.Circle, tintColor: Color.Green }} />
 *    <List.Item title="Magenta" icon={{ source: Icon.Circle, tintColor: Color.Magenta }} />
 *    <List.Item title="Orange" icon={{ source: Icon.Circle, tintColor: Color.Orange }} />
 *    <List.Item title="Purple" icon={{ source: Icon.Circle, tintColor: Color.Purple }} />
 *    <List.Item title="Red" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
 *    <List.Item title="Yellow" icon={{ source: Icon.Circle, tintColor: Color.Yellow }} />
 *    <List.Item title="PrimaryText" icon={{ source: Icon.Circle, tintColor: Color.PrimaryText }} />
 *    <List.Item title="SecondaryText" icon={{ source: Icon.Circle, tintColor: Color.SecondaryText }} />
 *  </List>
 *  );
 * };
 * ```
 */
export declare enum Color {
    Blue = "raycast-blue",
    Green = "raycast-green",
    Magenta = "raycast-magenta",
    Orange = "raycast-orange",
    Purple = "raycast-purple",
    Red = "raycast-red",
    Yellow = "raycast-yellow",
    PrimaryText = "raycast-primary-text",
    SecondaryText = "raycast-secondary-text"
}

export declare namespace Color {
    /**
     * Union type for the supported color types.
     *
     * {@link Color.Raw} will be dynamically adjusted to achieve high contrast with the Raycast user interface.
     *
     * @example
     * ```typescript
     * import { Color, Icon, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Item title="Built-in color" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
     *       <List.Item title="HEX" icon={{ source: Icon.Circle, tintColor: "#FF0000" }} />
     *       <List.Item title="Short HEX" icon={{ source: Icon.Circle, tintColor: "#F00" }} />
     *       <List.Item title="RGBA" icon={{ source: Icon.Circle, tintColor: "rgb(255, 0, 0)" }} />
     *       <List.Item title="RGBA Percentage" icon={{ source: Icon.Circle, tintColor: "rgb(255, 0, 0, 1.0)" }} />
     *       <List.Item title="HSL" icon={{ source: Icon.Circle, tintColor: "hsla(200, 20%, 33%, 0.2)" }} />
     *       <List.Item title="Keywords" icon={{ source: Icon.Circle, tintColor: "red" }} />
     *     </List>
     *   );
     * };
     * ```
     */
    export type ColorLike = Color | Color.Dynamic | Color.Raw;
    /**
     * A dynamic color applies different colors depending on the active Raycast theme.
     *
     * @example
     * ```typescript
     * import { Color, Icon, List } from "@raycast/api";
     *
     * export default function Command() {
     *  return (
     *  <List>
     *    <List.Item title="Dynamic Tint Color" icon={{ source: Icon.Circle, tintColor: { light: "#FF01FF", dark: "#FFFF50", adjustContrast: true } }} />
     *    <List.Item title="Dynamic Tint Color" icon={{ source: Icon.Circle, tintColor: { light: "#FF01FF", dark: "#FFFF50" } }} />
     *  </List>
     *  );
     * };
     * ```
     */
    export interface Dynamic {
        /**
         * The color which is used in light theme.
         */
        light: Color.Raw;
        /**
         * The color which is used in dark theme.
         */
        dark: Color.Raw;
        /**
         * Enables dynamic contrast adjustment for light and dark theme color.
         *
         * @remarks
         * Colors different to the built-in {@link Color} can be dynamically adjusted to achieve high contrast with the
         * Raycast user interface. This makes it easy to guarantee a good look and feel when you aren't in control of the
         * color, e.g. get it via a network request.
         *
         * @defaultValue `false`
         */
        adjustContrast?: boolean | undefined | null;
    }
    /**
     * You can use any of the following color formats:
     * - HEX, e.g `#FF0000`
     * - Short HEX, e.g. `#F00`
     * - RGBA, e.g. `rgb(255, 0, 0)`
     * - RGBA Percentage, e.g. `rgb(255, 0, 0, 1.0)`
     * - HSL, e.g. `hsla(200, 20%, 33%, 0.2)`
     * - Keywords, e.g. `red`
     */
    export type Raw = string;
    /** The standard colors. Use those colors for consistency.
     *
     * @remarks
     * The colors automatically adapt to the Raycast theme (light or dark).
     */
    const Brown: Color.Dynamic;
}

/**
 * Creates and shows a confirmation Alert with the given options.
 *
 * @param options - The options used to create the Alert.
 * @returns A Promise that resolves to a boolean when the user triggers one of the actions.
 * It will be `true` for the primary Action, `false` for the dismiss Action.
 *
 * @example
 * ```typescript
 * import { confirmAlert } from "@raycast/api";
 *
 * export default async () => {
 *   if (await confirmAlert({ title: "Are you sure?" })) {
 *     // do something
 *   }
 * };
 * ```
 */
export declare function confirmAlert(options: Alert.Options): Promise<boolean>;

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

declare interface DatePickerProps extends FormItemProps<Date | null> {
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
declare type DatePickerRef = FormItemRef;

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
declare interface DescriptionProps {
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
 * Renders a markdown (CommonMark) string.
 *
 * @remarks
 * Typically used as a standalone view or when navigating from a {@link List}.
 *
 * @example
 * ```typescript
 * import { Detail } from "@raycast/api";
 *
 * export default function Command() {
 *   return <Detail markdown="**Hello** _World_!" />;
 * }
 * ```
 */
export declare const Detail: FunctionComponent<DetailProps_2> & DetailMembers;

export declare namespace Detail {
    /**
     * Props of the {@link Detail} React component.
     */
    export type Props = DetailProps_2;
    export namespace Metadata {
        /**
         * Props of the {@link Detail.Metadata} React component.
         */
        export type Props = MetadataProps;
        export namespace Label {
            /**
             * Props of the {@link Detail.Metadata.Label} React component.
             */
            export type Props = LabelProps;
        }
        export namespace Separator {
            /**
             * Props of the {@link Detail.Metadata.Separator} React component.
             */
            export type Props = SeparatorProps;
        }
        export namespace Link {
            /**
             * Props of the {@link Detail.Metadata.Link} React component.
             */
            export type Props = LinkProps;
        }
        export namespace TagList {
            /**
             * Props of the {@link Detail.Metadata.TagList} React component.
             */
            export type Props = TagListProps;
            export namespace Item {
                /**
                 * Props of the {@link Detail.Metadata.TagList.Item} React component.
                 */
                export type Props = TagListItemProps;
            }
        }
    }
}

/**
 * See {@link List.Item.Detail}
 */
declare const Detail_2: FunctionComponent<DetailProps_2> & DetailMembers_2;

declare interface DetailMembers {
    /**
     * A Metadata view that will be shown in the right-hand-side of the `Detail`.
     *
     * Use it to display additional structured data about the main content shown in the `Detail` view.
     */
    Metadata: typeof Metadata;
}

declare interface DetailMembers_2 {
    /**
     * A Metadata view that will be shown in the bottom side of the `List.Item.Detail`.
     *
     * Use it to display additional structured data about the content of the `List.Item`.
     *
     * @example
     * ```typescript
     * import { List } from "@raycast/api";
     *
     * export default function Metadata() {
     *   const markdown = `
     * ![Illustration](https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png)
     * There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.
     * `;
     *   return (
     *     <List isShowingDetail>
     *       <List.Item
     *         title="Bulbasaur"
     *         detail={
     *           <List.Item.Detail
     *             markdown={markdown}
     *             metadata={
     *               <List.Item.Detail.Metadata>
     *                 <List.Item.Detail.Metadata.Label title="Types" />
     *                 <List.Item.Detail.Metadata.Label title="Grass" icon="pokemon_types/grass.svg" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Poison" icon="pokemon_types/poison.svg" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Chracteristics" />
     *                 <List.Item.Detail.Metadata.Label title="Height" text="70cm" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Weight" text="6.9 kg" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Abilities" />
     *                 <List.Item.Detail.Metadata.Label title="Chlorophyll" text="Main Series" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Overgrow" text="Main Series" />
     *                 <List.Item.Detail.Metadata.Separator />
     *               </List.Item.Detail.Metadata>
     *             }
     *           />
     *         }
     *       />
     *     </List>
     *   );
     * }
     * ```
     *
     * @example
     * ```typescript
     * import { List } from "@raycast/api";
     *
     * export default function Metadata() {
     *   return (
     *     <List isShowingDetail>
     *       <List.Item
     *         title="Bulbasaur"
     *         detail={
     *           <List.Item.Detail
     *             metadata={
     *               <List.Item.Detail.Metadata>
     *                 <List.Item.Detail.Metadata.Label title="Types" />
     *                 <List.Item.Detail.Metadata.Label title="Grass" icon="pokemon_types/grass.svg" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Poison" icon="pokemon_types/poison.svg" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Chracteristics" />
     *                 <List.Item.Detail.Metadata.Label title="Height" text="70cm" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Weight" text="6.9 kg" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Abilities" />
     *                 <List.Item.Detail.Metadata.Label title="Chlorophyll" text="Main Series" />
     *                 <List.Item.Detail.Metadata.Separator />
     *                 <List.Item.Detail.Metadata.Label title="Overgrow" text="Main Series" />
     *                 <List.Item.Detail.Metadata.Separator />
     *               </List.Item.Detail.Metadata>
     *             }
     *           />
     *         }
     *       />
     *     </List>
     *   );
     * }
     * ```
     */
    Metadata: typeof Metadata;
}

declare interface DetailProps extends ActionsInterface, NavigationChildInterface {
    /**
     * The CommonMark string to be rendered.
     */
    markdown?: string | null;
    /**
     * The `Detail.Metadata` to be rendered in the right side area
     */
    metadata?: ReactNode;
}

declare interface DetailProps_2 {
    /**
     * Indicates whether a loading bar should be shown or hidden above the detail
     *
     * @defaultValue `false`
     */
    isLoading?: boolean;
    /**
     * The CommonMark string to be rendered in the right side area when the parent List is showing details and the item is selected.
     */
    markdown?: string | null;
    /**
     * The `List.Item.Detail.Metadata` to be rendered in the bottom side of the `List.Item.Detail`
     */
    metadata?: ReactNode;
}

/**
 * See {@link Form.Dropdown}
 */
declare const Dropdown: ForwardRefExoticComponent<DropdownProps & RefAttributes<FormItemRef>> & DropdownMembers;

/**
 * See {@link Grid.Dropdown}
 */
declare const Dropdown_2: FunctionComponent<DropdownProps_2> & DropdownMembers_2;

/**
 * See {@link Form.Dropdown.Item}, {@link Grid.Dropdown.Item}
 */
declare const DropdownItem: FunctionComponent<DropdownItemProps>;

/**
 * See {@link Form.Dropdown.Item.Props}
 */
declare interface DropdownItemProps {
    /**
     * Value of the dropdown item.
     * Make sure to assign each unique value for each item.
     */
    value: string;
    /**
     * The title displayed for the item.
     */
    title: string;
    /**
     * A optional icon displayed for the item.
     */
    icon?: Image.ImageLike;
    /**
     * An optional property used for providing additional indexable strings for search.
     * When filtering the items in Raycast, the keywords will be searched in addition to the title.
     *
     * @defaultValue The title of its section if any
     */
    keywords?: string[];
}

declare interface DropdownMembers {
    /**
     * Visually separated group of dropdown items.
     *
     * @remarks
     * Use sections to group related menu items together.
     *
     * @example
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
     *       <Form.Dropdown id="food" title="Favorite Food">
     *         <Form.Dropdown.Section title="Fruits">
     *           <Form.Dropdown.Item value="apple" title="Apple" icon="🍎" />
     *           <Form.Dropdown.Item value="banana" title="Banana" icon="🍌" />
     *         </Form.Dropdown.Section>
     *         <Form.Dropdown.Section title="Vegetables">
     *           <Form.Dropdown.Item value="broccoli" title="Broccoli" icon="🥦" />
     *           <Form.Dropdown.Item value="carrot" title="Carrot" icon="🥕" />
     *         </Form.Dropdown.Section>
     *       </Form.Dropdown>
     *     </Form>
     *   );
     * }
     * ```
     */
    Section: typeof DropdownSection;
    /**
     * A dropdown item in a {@link DropdownRef}
     *
     * @example
     * ```typescript
     * import { ActionPanel, Form, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Form
     *       actions={
     *         <ActionPanel>
     *           <Action.SubmitForm title="Submit Icon" onSubmit={(values) => console.log(values)} />
     *         </ActionPanel>
     *       }
     *     >
     *       <Form.Dropdown id="icon" title="Icon">
     *         <Form.Dropdown.Item value="circle" title="Cirlce" icon={Icon.Circle} />
     *       </Form.Dropdown>
     *     </Form>
     *   );
     * }
     * ```
     */
    Item: typeof DropdownItem;
}

declare interface DropdownMembers_2 {
    /**
     * Visually separated group of dropdown items in a Dropdown.
     *
     * @remarks
     * Use sections to group related dropdown items together.
     *
     * @example
     * ```typescript
     * import { Grid } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Grid searchBarAccessory={
     *       <Grid.Dropdown tooltip="Dropdown With Sections">
     *         <Grid.Dropdown.Section title="First Section">
     *           <Grid.Dropdown.Item title="One" value="one" />
     *         </Grid.Dropdown.Section>
     *         <Grid.Dropdown.Section title="Second Section">
     *           <Grid.Dropdown.Item title="Two" value="two" />
     *         </Grid.Dropdown.Section>
     *       </Grid.Dropdown>
     *     }>
     *       <Grid.Item title="Item in the Main Grid">
     *     </Grid>
     *   );
     * }
     * ```
     */
    Section: typeof DropdownSection;
    /**
     * A dropdown item in a Dropdown
     *
     * @example
     * ```typescript
     * import { Grid } from "@raycast/api";
     *
     * export default function Command() {
     *     return (
     *       <Grid searchBarAccessory={
     *         <Grid.Dropdown tooltip="Dropdown With Items">
     *           <Grid.Dropdown.Item title="One" value="one" />
     *           <Grid.Dropdown.Item title="Two" value="two" />
     *           <Grid.Dropdown.Item title="Three" value="three" />
     *         </Grid.Dropdown>
     *       }>
     *         <Grid.Item title="Item in the Main Grid">
     *       </Grid>
     *   );
     * }
     * ```
     */
    Item: typeof DropdownItem;
}

/**
 * See {@link Form.Dropdown.Props}
 */
declare interface DropdownProps extends FormItemProps<string>, SearchBarInterface {
    /**
     * Placeholder text that will be shown in the dropdown search field.
     *
     * @defaultValue `"Search…"`
     */
    placeholder?: string;
    /**
     * Sections or items. If {@link Form.Dropdown.Item} elements are specified, a default section is automatically created.
     */
    children?: ReactNode;
}

declare interface DropdownProps_2 extends SearchBarInterface {
    /**
     * ID of the dropdown.
     */
    id?: string;
    /**
     * Tooltip displayed when hovering the dropdown.
     */
    tooltip: string;
    /**
     * Placeholder text that will be shown in the dropdown search field.
     *
     * @defaultValue `"Search…"`
     */
    placeholder?: string;
    /**
     * Indicates whether the value of the dropdown should be persisted after selection, and restored next time the dropdown is rendered.
     */
    storeValue?: boolean | undefined;
    /**
     * The currently value of the dropdown.
     */
    value?: string;
    /**
     * The default value of the dropdown.
     * Keep in mind that `defaultValue` will be configured once per component lifecycle. This means that if a user changes the value, `defaultValue` won't be configured on re-rendering.
     *
     * **If you're using `storeValue` and configured it as `true` _and_ a Dropdown.Item with the same value exists, then it will be selected.**
     *
     * **If you configure `value` at the same time as `defaultValue`, the `value` will have precedence over `defaultValue`.**
     */
    defaultValue?: string;
    /**
     * Dropdown sections or items. If Dropdown.Item elements are specified, a default section is automatically created.
     */
    children?: ReactNode;
    /**
     * Callback triggered when the dropdown selection changes.
     */
    onChange?: (newValue: string) => void;
}

/**
 * Form.Dropdown Ref type.
 */
declare type DropdownRef = FormItemRef;

/**
 * See {@link Form.Dropdown.Section}, {@link Grid.Dropdown.Section}
 */
declare const DropdownSection: FunctionComponent<DropdownSectionProps>;

/**
 * See {@link Form.Dropdown.Section.Props}
 */
declare interface DropdownSectionProps {
    /**
     * The item elements of the section.
     */
    children?: ReactNode;
    /**
     * Title displayed above the section
     */
    title?: string;
}


declare const EmptyView: FunctionComponent<EmptyViewProps>;

declare interface EmptyViewProps extends ActionsInterface {
    /**
     * An icon displayed in the center of the EmptyView.
     *
     * @remarks
     * If an SVG is used, its longest side will be 128 pixels. Other images will be up/downscaled proportionally so that the longest side is between 64 and 256 pixels.
     * If not specified, Raycast's default `EmptyView` icon will be used.
     */
    icon?: Image.ImageLike | undefined | null;
    /**
     * The main title displayed for the Empty View.
     */
    title?: string;
    /**
     * An optional description for why the empty view is shown.
     */
    description?: string;
}

/**
 * Holds data about the environment the command is running in. Use the global {@link environment} object to retrieve values.
 */
export declare interface Environment {
    /**
     * The version of the main Raycast app
     */
    raycastVersion: string;
    /**
     * The name of the extension, as specified in package.json
     */
    extensionName: string;
    /**
     * The name of the launched command, as specified in package.json
     */
    commandName: string;
    /**
     * The mode of the launched command, as specified in package.json
     */
    commandMode: "no-view" | "view" | "menu-bar";
    /**
     * The absolute path to the assets directory of the extension.
     *
     * @remarks
     * This directory is used internally to load icons, images, and other bundled assets.
     */
    assetsPath: string;
    /**
     * The absolute path for the support directory of an extension. Use it to read and write files related to your extension or command.
     */
    supportPath: string;
    /**
     * Indicates whether the command is a development command (vs. an installed command from the Store).
     */
    isDevelopment: boolean;
    /**
     * The theme used by the Raycast application.
     */
    theme: "light" | "dark";
    /**
     * The text size used by the Raycast application.
     */
    textSize: "medium" | "large";
    /**
     * The type of launch for the command (user initiated or background).
     */
    launchType: LaunchType;
}

/**
 * Contains environment values such as the Raycast version, extension info, and paths.
 *
 * @example
 * ```typescript
 * import { environment } from "@raycast/api";
 *
 * console.log(`Raycast version: ${environment.raycastVersion}`);
 * console.log(`Extension name: ${environment.extensionName}`);
 * console.log(`Command name: ${environment.commandName}`);
 * console.log(`Command mode: ${environment.commandMode}`);
 * console.log(`Assets path: ${environment.assetsPath}`);
 * console.log(`Support path: ${environment.supportPath}`);
 * console.log(`Is development mode: ${environment.isDevelopment}`);
 * console.log(`Raycast theme: ${environment.theme}`);
 * console.log(`Raycast launchType: ${environment.launchType}`);
 * console.log(`Raycast launchContext: ${environment.launchContext}`);
 * ```
 */
export declare const environment: Environment;

/**
 * An icon as it's used in the Finder.
 *
 * @example
 * ```typescript
 * import { List } from "@raycast/api";
 *
 * export default function Command() {
 *   return (
 *     <List>
 *       <List.Item title="File icon" icon={{ fileIcon: __filename }} />
 *     </List>
 *   );
 * };
 * ```
 */
export declare interface FileIcon {
    /**
     * The path to a file or folder to get its icon from.
     */
    fileIcon: string;
}

/**
 * See {@link Form.FilePicker}
 */
declare const FilePicker: ForwardRefExoticComponent<FilePickerProps & RefAttributes<FilePickerRef>>;

/**
 * See {@link Form.FilePicker.Props}
 */
declare interface FilePickerProps extends FormItemProps<string[]> {
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

declare type FilePickerRef = FormItemRef;

/**
 * Holds data about a File System item. Use the {@link getSelectedFinderItems} method to retrieve values.
 */
export declare interface FileSystemItem {
    /**
     * The path to the item
     */
    path: string;
}

/**
 * Shows a list of form items such as {@link Form.TextField}, {@link Form.Checkbox} or {@link Form.Dropdown}.
 */
export declare const Form: FunctionComponent<FormProps> & FormMembers;

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
declare type FormEvent<T extends FormValue> = {
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
declare type FormEventType = "focus" | "blur";

/**
 * Props of the Form.Item React component.
 */
declare interface FormItemProps<T extends FormValue> {
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
declare interface FormItemRef {
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
 * Props of the {@link Form} React component.
 */
declare interface FormProps extends ActionsInterface, NavigationChildInterface {
    /**
     * Defines whether the Form.Items values will be preserved when user exits the screen.
     * @remarks Keep in mind that drafts for forms nested in navigation is not supported yet. In the case you will see a warning about it.
     * @defaultValue `false`
     */
    enableDrafts?: boolean;
    /**
     * The Form.Item elements of the form.
     */
    children?: ReactNode;
}

/**
 * A possible form item value that will be used as an input for the submit callback of a form.
 */
declare type FormValue = string | number | boolean | string[] | number[] | Date | null;

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
declare interface FormValues {
    /**
     * The form value of a given item.
     */
    [item: string]: any;
}

/**
 * Returns all applications that can open the file.
 *
 * @param path - The path of the file or folder to get the applications for. If no path is specified, all installed applications are returned.
 * @returns An array of {@link Application}.
 *
 * @example
 * ```typescript
 * import { getApplications } from "@raycast/api";
 *
 * export default async () => {
 *   const installedApplications = await getApplications();
 *   console.log("The following applications are installed on your Mac:");
 *   console.log(installedApplications.map((a) => a.name).join(", "));
 * };
 * ```
 */
export declare function getApplications(path?: PathLike): Promise<Application[]>;

/**
 * Returns the default application that the file would be opened with.
 *
 * @param path - The path of the file or folder to get the default application for.
 * @returns A Promise that resolves with the default {@link Application} that would open the file. If no application was found, the promise will be rejected.
 *
 * @example
 * ```typescript
 * import { getDefaultApplication } from "@raycast/api";
 *
 * export default async () => {
 *   const defaultApplication = await getDefaultApplication(__filename);
 *   console.log(`Default application for JavaScript is: ${defaultApplication.name}`);
 * };
 * ```
 */
export declare function getDefaultApplication(path: PathLike): Promise<Application>;

/**
 * Returns the frontmost application.
 *
 * @returns A Promise that resolves with the frontmost {@link Application}. If no application was found, the promise will be rejected.
 *
 * @example
 * ```typescript
 * import { getFrontmostApplication } from "@raycast/api";
 *
 * export default async () => {
 *   const frontmostApplication = await getFrontmostApplication();
 *   console.log(`The frontmost application is: ${frontmostApplication.name}`);
 * };
 * ```
 */
export declare function getFrontmostApplication(): Promise<Application>;

/**
 * A function to access the preference values that have been passed to the command.
 *
 * @returns An object with the preference names as property key and the typed value as property value.
 *
 * @remarks
 * Each preference name is mapped to its value and the defined default values are used as fallback values.
 *
 * @example
 * ```typescript
 * import { getPreferenceValues } from "@raycast/api";
 *
 * interface Preferences {
 *   name: string;
 *   bodyWeight?: string;
 *   bodyHeight?: string;
 * }
 *
 * export default async () => {
 *   const preferences = getPreferenceValues<Preferences>();
 *   console.log(preferences);
 * };
 * ```
 */
export declare function getPreferenceValues<Values extends PreferenceValues = PreferenceValues>(): Values;

/**
 * Gets the selected items from Finder.
 *
 * @returns A Promise that resolves with the selected file system items. If Finder is not the frontmost application, the promise will be rejected.
 *
 * @example
 * ```typescript
 * import { getSelectedFinderItems, Clipboard, showToast, Toast } from "@raycast/api";
 *
 * export default async () => {
 *   try {
 *     const selectedItems = await getSelectedFinderItems();
 *     if (selectedItems.length) {
 *       await Clipboard.paste(selectedItems[0].path);
 *     }
 *   } catch (error) {
 *     await showToast({
 *       style: Toast.Style.Failure,
 *       title: "Cannot copy file path",
 *       message: String(error)
 *     });
 *   }
 * };
 * ```
 */
export declare function getSelectedFinderItems(): Promise<FileSystemItem[]>;

/**
 * Gets the selected text of the frontmost application.
 *
 * @returns A Promise that resolves with the selected text. If no text is selected in the frontmost application, the promise will be rejected.
 *
 * @example
 * ```typescript
 * import { getSelectedText, Clipboard, showToast, Toast } from "@raycast/api";
 *
 * export default async () => {
 *   try {
 *     const selectedText = await getSelectedText();
 *     const transformedText = selectedText.toUpperCase();
 *     await Clipboard.paste(transformedText);
 *   } catch (error) {
 *     await showToast({
 *       style: Toast.Style.Failure,
 *       title: "Cannot transform text",
 *       message: String(error)
 *     });
 *   }
 * };
 * ```
 */
export declare function getSelectedText(): Promise<string>;

/**
 * Displays {@link Grid.Section} or {@link Grid.Item}, optionally {@link Grid.Dropdown}.
 *
 * @remarks
 * The grid uses built-in filtering by indexing the title of grid items and additionally keywords.
 *
 * @example
 * ```typescript
 * import { Grid } from "@raycast/api";
 *
 * function DrinkDropdown(props: DrinkDropdownProps) {
 *   const { isLoading = false, drinkTypes, onDrinkTypeChange } = props;
 *   return (
 *     <Grid.Dropdown
 *       tooltip="Select Drink Type"
 *       storeValue={true}
 *       onChange={(newValue) => {
 *         onDrinkTypeChange(newValue);
 *       }}
 *     >
 *       <Grid.Dropdown.Section title="Alcoholic Beverages">
 *         {drinkTypes.map((drinkType) => (
 *           <Grid.Dropdown.Item key={drinkType.id} title={{ value: drinkType.name, tooltip: drinkType.definition }} value={drinkType.id} />
 *         ))}
 *       </Grid.Dropdown.Section>
 *     </Grid.Dropdown>
 *   );
 * }
 *
 * export default function Command() {
 *   const drinkTypes = [
 *     { id: 1, name: 'Beer', definition: "an alcoholic drink made from yeast-fermented malt flavoured with hops" },
 *     { id: 2, name: 'Wine', definition: "an alcoholic drink made from fermented grape juice" }];
 *   const onDrinkTypeChange = (newValue) => {
 *     console.log(newValue);
 *   }
 *   return (
 *     <Grid
 *       navigationTitle="Search Beers"
 *       searchBarPlaceholder="Search your favorite drink"
 *       searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={onDrinkTypeChange} />}
 *     >
 *       <Grid.Item title="Augustiner Helles" />
 *       <Grid.Item title="Camden Hells" />
 *       <Grid.Item title="Leffe Blonde" />
 *       <Grid.Item title="Sierra Nevada IPA" />
 *     </Grid>
 *   );
 * }
 * ```
 */
export declare const Grid: FunctionComponent<GridProps> & GridMembers;

export declare namespace Grid {
    /**
     * Props of the {@link Grid} React component.
     */
    export type Props = GridProps;
    /**
     * Allowed `aspectRatio` values.
     */
    export type AspectRatio = `${GridAspectRatio}`;
    /**
     * Enum representing the amount of space there should be between a {@link Grid.Item}'s content and its borders.
     */
    export type Inset = GridInset;
    /**
     * Enum representing the a {@link Grid.Items}'s fit.
     */
    export type Fit = GridFit;
    /**
     * Enum representing the number of items that should be displayed on a single row.
     */
    export type ItemSize = GridItemSize;
    export namespace EmptyView {
        export type Props = EmptyViewProps;
    }
    export namespace Dropdown {
        /**
         * Props of the {@link Grid.Dropdown} React component.
         */
        export type Props = DropdownProps_2;
        export namespace Item {
            /**
             * Props of the {@link Grid.Dropdown.Item} React component.
             */
            export type Props = DropdownItemProps;
        }
        export namespace Section {
            /**
             * Props of the {@link Grid.Dropdown.Section} React component.
             */
            export type Props = DropdownSectionProps;
        }
    }
    export namespace Item {
        /**
         * Props of the {@link Grid.Item} React component.
         */
        export type Props = ItemProps_2;
    }
    export namespace Section {
        /**
         * Props of the {@link Grid.Section} React component.
         */
        export type Props = SectionProps_3;
    }
}

declare enum GridAspectRatio {
    One = "1",
    ThreeToTwo = "3/2",
    TwoToThree = "2/3",
    FourToThree = "4/3",
    ThreeToFour = "3/4",
    SixteenToNine = "16/9",
    NineToSixteen = "9/16"
}

declare enum GridFit {
    Contain = "contain",
    Fill = "fill"
}

declare enum GridInset {
    Zero = "zero",
    Small = "sm",
    Medium = "md",
    Large = "lg"
}

declare enum GridItemSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

declare interface GridMembers {
    /**
     * Enum representing the amount of space there should be between a {@link Grid.Item}'s content and its borders.
     */
    Inset: typeof GridInset;
    /**
     * Enum representing the a {@link Grid.Items}'s fit.
     */
    Fit: typeof GridFit;
    /**
     * A view to display when there aren't any items available. Use to greet users with a friendly message if the
     * extension requires user input before it can show any grid items e.g. when searching for a package, an article etc.
     *
     * @remarks
     * Raycast provides a default `EmptyView` that will be displayed if the {@link Grid} component either has no children,
     * or if it has children, but none of them match the query in the search bar. This too can be overridden by passing
     * an empty view alongside the other `Grid.Item`s.
     *
     * @example
     * ```typescript
     * import { useState } from "react";
     * import { Grid } from "@raycast/api";
     *
     * export default function CommandWithCustomEmptyState() {
     *   const [state, setState] = useState({ searchText: "", items: [] });
     *
     *   useEffect(() => {
     *     // perform an API call that eventually populates `items`.
     *   }, [state.searchText])
     *
     *   return (
     *     <Grid
     *       onSearchTextChange={(newValue) =>
     *         setState((previous) => ({ ...previous, searchText: newValue }))
     *       }
     *     >
     *       {state.searchText === "" && state.items.length === 0 ? (
     *         <Grid.EmptyView
     *           icon={{ source: "https://placekitten.com/500/500" }}
     *           title="Type something to get started"
     *         />
     *       ) : (
     *         state.items.map((item) => <Grid.Item key={item} title={item} />)
     *       )}
     *     </Grid>
     *   );
     * }
     * ```
     */
    EmptyView: typeof EmptyView;
    /**
     * A item in the {@link Grid}.
     *
     * @remarks
     * This is one of the foundational UI components of Raycast. A grid item represents a single entity. It can be a
     * GitHub pull request, a file, or anything else. You most likely want to perform actions on this item, so make it clear
     * to the user what this grid item is about.
     *
     * @example
     * ```typescript
     * import { Icon, Grid } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Grid>
     *       <Grid.Item content={Icon.Star} title="Augustiner Helles" subtitle="0,5 Liter" />
     *     </Grid>
     *   );
     * }
     * ```
     */
    Item: typeof Item_2;
    /**
     * A group of related {@link Grid.Item}.
     *
     * @remarks
     * Sections are a great way to structure your grid. For example, group GitHub issues with the same status and order them by priority.
     * This way, users can quickly access what is most relevant.
     *
     * @example
     * ```typescript
     * import { Grid } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Grid>
     *       <Grid.Section title="Lager">
     *         <Grid.Item title="Camden Hells" />
     *       </Grid.Section>
     *       <Grid.Section title="IPA">
     *         <Grid.Item title="Sierra Nevada IPA" />
     *       </Grid.Section>
     *     </Grid>
     *   );
     * }
     * ```
     */
    Section: typeof Section_3;
    /**
     * A dropdown menu that will be shown in the right-hand-side of the search bar.
     *
     * @example
     * ```typescript
     * import { Grid } from "@raycast/api";
     *
     * function DrinkDropdown(props: DrinkDropdownProps) {
     *   const { drinkTypes, onDrinkTypeChange } = props;
     *   return (
     *     <Grid.Dropdown
     *       tooltip="Select Drink Type"
     *       storeValue={true}
     *       onChange={(newValue) => {
     *         onDrinkTypeChange(newValue);
     *       }}
     *     >
     *       <Grid.Dropdown.Section title="Alcoholic Beverages">
     *         {drinkTypes.map((drinkType) => (
     *           <Grid.Dropdown.Item key={drinkType.id} title={drinkType.name} value={drinkType.id} />
     *         ))}
     *       </Grid.Dropdown.Section>
     *     </Grid.Dropdown>
     *   );
     * }
     *
     * export default function Command() {
     *   const drinkTypes = [{ id: 1, name: 'Beer' }, { id: 2, name: 'Wine' }];
     *   const onDrinkTypeChange = (newValue) => {
     *     console.log(newValue);
     *   }
     *   return (
     *     <Grid
     *       navigationTitle="Search Beers"
     *       searchBarPlaceholder="Search your favorite drink"
     *       searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={onDrinkTypeChange} />}
     *     >
     *       <Grid.Item title="Augustiner Helles" />
     *       <Grid.Item title="Camden Hells" />
     *       <Grid.Item title="Leffe Blonde" />
     *       <Grid.Item title="Sierra Nevada IPA" />
     *     </Grid>
     *   );
     * }
     * ```
     */
    Dropdown: typeof Dropdown_2;
}

declare interface GridProps extends ActionsInterface, NavigationChildInterface, SearchBarInterface {
    /**
     * A reference to an {@link ActionPanel}. It will only be shown when there aren't any children.
     */
    actions?: ReactNode;
    /**
     * Grid sections or items. If {@link Grid.Item} elements are specified, a default section is automatically created.
     */
    children?: ReactNode;
    /**
     * Column count for the grid's sections. Minimum value is 1, maximum value is 8.
     *
     * @defaultValue 5
     */
    columns?: number;
    /**
     * Aspect ratio for the {@link Grid.Item} elements. Defaults to 1.
     */
    aspectRatio?: Grid.AspectRatio;
    /**
     * Fit for the {@link Grid.Item} element content. Defaults to "contain"
     */
    fit?: Grid.Fit;
    /**
     * Indicates how much space there should be between a {@link Grid.Item}s' content and its borders.
     * The absolute value depends on the value of the `itemSize` prop.
     */
    inset?: Grid.Inset;
    /**
     * Callback triggered when the item selection in the grid changes.
     *
     * When the received id is `null`, it means that all items have been filtered out
     * and that there are no item selected
     */
    onSelectionChange?: (id: string | null) => void;
    /**
     * {@link Grid.Dropdown} that will be shown in the right-hand-side of the search bar.
     */
    searchBarAccessory?: ReactElement<DropdownProps_2> | undefined | null;
    /**
     * The text that will be displayed in the search bar.
     */
    searchText?: string;
    /**
     * Placeholder text that will be shown in the search bar.
     *
     * @defaultValue `"Search…"`
     */
    searchBarPlaceholder?: string;
    /**
     * Selects the item with the specified id.
     */
    selectedItemId?: string;
}

/**
 * Display different types of images, including network images or bundled assets.
 *
 * @example
 * ```typescript
 * // Built-in icon
 * const icon = Icon.Eye
 *
 * // Built-in icon with tint color
 * const tintedIcon = { source: Icon.Bubble, tintColor: Color.Red }
 *
 * // Bundled asset with circular mask
 * const avatar = { source: "avatar.png", mask: Image.Mask.Circle }
 *
 * // Theme-aware icon
 * const icon = { source: { light: "icon-light.png", dark: "icon-dark.png" }}
 * ```
 *
 * _Apply image transforms to the source, such as a `mask` or a `tintColor`._
 */
export declare interface Image {
    /**
     * The {@link Image.Source} of the image.
     */
    source: Image.Source;
    /**
     * {@link Image.Fallback} image, in case `source` can't be loaded.
     */
    fallback?: Image.Fallback | undefined | null;
    /**
     * A {@link Image.Mask} to apply to the image.
     */
    mask?: Image.Mask | undefined | null;
    /**
     * A {@link Color.ColorLike} to tint all the non-transparent pixels of the image.
     */
    tintColor?: Color.ColorLike | undefined | null;
}

export declare namespace Image {
    /**
     * Image is a string representing a URL.
     */
    export type URL = string;
    /**
     * Image is a string denoting an asset from the `assets/` folder.
     */
    export type Asset = string;
    /**
     * Union type for the supported image types.
     *
     * @example
     * ```typescript
     * import { Icon, Image, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Item title="String" icon="https://raycast.com/uploads/avatar.png" />
     *       <List.Item title="Icon" icon={Icon.Circle} />
     *       <List.Item title="FileIcon" icon={{ fileIcon: __filename }} />
     *       <List.Item title="Image" icon={{ source: "https://raycast.com/uploads/avatar.png", mask: Image.Mask.Circle }} />
     *     </List>
     *   );
     * };
     * ```
     */
    export type ImageLike = URL | Asset | Icon | FileIcon | Image;
    /**
     * The source of an {@link Image}. Can be either a remote URL, a local file resource, a built-in {@link Icon} or
     * a single emoji.
     *
     * @remarks
     * For consistency, it's best to use the built-in {@link Icon} in lists, the Action Panel, and other places. If a
     * specific icon isn't built-in, you can reference custom ones from the `assets` folder of the extension by file name,
     * e.g. `my-icon.png`. Alternatively, you can reference an absolute HTTPS URL that points to an image or use an emoji.
     * You can also specify different remote or local assets for light and dark theme.
     *
     * @example
     * ```typescript
     * import { Icon, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Item title="String" icon={{ source: "https://raycast.com/uploads/avatar.png" }} />
     *       <List.Item title="Icon" icon={{ source: Icon.Circle }} />
     *       <List.Item
     *         title="Theme"
     *         icon={{
     *           source: { light: "https://raycast.com/uploads/avatar.png", dark: "https://raycast.com/uploads/avatar.png" },
     *         }}
     *       />
     *     </List>
     *   );
     * };
     * ```
     */
    export type Source = URL | Asset | Icon | {
        light: URL | Asset;
        dark: URL | Asset;
    };
    /**
     * Fallback {@link Image} source. Can be a local file resource, a built-in {@link Icon}, a single emoji, or a theme-aware asset.
     * Any specified `mask` or `tintColor` will also apply to the fallback image.
     *
     * @example
     * ```typescript
     * import { Icon, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Item title="String" icon={{ source: "https://raycast.com/uploads/avatar.png", fallback: Icon.Circle }} />
     *       <List.Item title="Icon" icon={{ source: Icon.Circle }} />
     *       <List.Item
     *         title="Theme"
     *         icon={{
     *           source: { light: "https://raycast.com/uploads/avatar.png", dark: "https://raycast.com/uploads/avatar.png" },
     *         }}
     *       />
     *     </List>
     *   );
     * };
     * ```
     */
    export type Fallback = Asset | Icon | {
        light: Asset;
        dark: Asset;
    };
    /**
     * Available masks that can be used to change the shape of an image.
     *
     * @remarks
     * Can be handy to shape avatars or other items in a list.
     *
     * @example
     * ```typescript
     * import { Image, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Item title="Icon" icon={{ source: "https://raycast.com/uploads/avatar.png", mask: Image.Mask.Circle }} />
     *     </List>
     *   );
     * };
     * ```
     */
    export enum Mask {
        /**
         * Masks an image with a circle. Good to use for avatars.
         */
        Circle = "circle",
        /**
         * Masks an image with a rounded rectangle.
         */
        RoundedRectangle = "roundedRectangle"
    }
}

declare type InterExtensionLaunchOptions = IntraExtensionLaunchOptions & {
    /** when launching command from a different extension, the owner or author (as defined in the extension's manifest) is necessary */
    ownerOrAuthorName: string;
    /** when launching command from a different extension, the extension name (as defined in the extension's manifest) is necessary */
    extensionName: string;
};

/**
 * Options for launching a command from the same extension.
 */
declare type IntraExtensionLaunchOptions = {
    /** command name as defined in the extension's manifest */
    name: string;
    /** {@link LaunchType.UserInitiated} or {@link LaunchType.Background} */
    type: LaunchType;
    /** optional object for the argument properties and values as defined in the extension's manifest, for example: `{ "argument1": "value1" }` */
    arguments?: Arguments | null;
    /** arbitrary object for custom data that should be passed to the command and accessible as `environment.launchContext`; the object must be JSON serializable (Dates and Buffers supported) */
    context?: LaunchContext | null;
    /** optional string to send as fallback text to the command */
    fallbackText?: string | null;
};

/**
 * See {@link List.Item}
 */
declare const Item: FunctionComponent<ItemProps> & ItemMembers;

/**
 * See {@link Grid.Item}
 */
declare const Item_2: FunctionComponent<ItemProps_2>;

/**
 * See {@link MenuBarExtra.Item}
 */
declare const Item_3: FunctionComponent<ItemProps_3>;

declare type ItemAccessory = ({
    /**
     * An optional text that will be used as the label, optionally colored.
     * Color changes the text color to the provided color.
     * Defaults to {@link Color.SecondaryText}.
     */
    text?: string | undefined | null | {
        value: string | undefined | null;
        color?: Color;
    };
} | {
    /**
     * An optional Date that will be used as the label, optionally colored. The date is formatted relatively to the current time (for example `new Date()` will be displayed as `"now"`, yesterday's Date will be displayed as "1d", etc.).
     * Color changes the text color to the provided color.
     * Defaults to {@link Color.SecondaryText}.
     */
    date?: Date | undefined | null | {
        value: Date | undefined | null;
        color?: Color;
    };
} | {
    /**
     * A string or Date that will be used as the label, optionally colored. The date is formatted relatively to the current time (for example `new Date()` will be displayed as `"now"`, yesterday's Date will be displayed as "1d", etc.).
     * Color changes the text color to the provided color and sets a transparent background with the same color.
     * Defaults to {@link Color.SecondaryText}.
     */
    tag: string | Date | undefined | null | {
        value: string | Date | undefined | null;
        color?: Color.ColorLike;
    };
}) & {
    /**
     * An optional {@link Image.ImageLike} that will be used as the icon.
     * @remarks
     * An image will be shown in front of the text if {@link List.Item.Accessory.text} is specified.
     */
    icon?: Image.ImageLike | undefined | null;
    /**
     * An optional tooltip shown when the accessory is hovered.
     */
    tooltip?: string | undefined | null;
};

/**
 * An interface describing Action events in callbacks
 *
 * @example
 * ```typescript
 *import { MenuBarExtra } from "@raycast/api";
 *
 *export default function Command() {
 *  return (
 *    <MenuBarExtra>
 *      <MenuBarExtra.Item
 *        title="Log Action Event Type"
 *        onAction={(event: MenuBarExtra.ActionEvent) => console.log("Action Event Type", event.type)} />
 *    <MenuBarExtra>
 *  );
 *}
 * ```
 */
declare interface ItemActionEvent {
    /**
     * A type of the action event
     *
     * * `left-click` is a left mouse click on the {@link MenuBarExtra.Item} or a {@link Keyboard.Shortcut}
     * * `right-click` is a right mouse click on the {@link MenuBarExtra.Item}
     */
    type: "left-click" | "right-click";
}

declare interface ItemMembers {
    /**
     * A Detail view that will be shown in the right-hand-side of the List.
     *
     * @example
     * ```typescript
     * import { List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List isShowingDetail>
     *       <List.Item
     *         title="Pikachu"
     *         subtitle="Electric"
     *         detail={<List.Item.Detail markdown="![Illustration](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)" />}
     *       />
     *     </List>
     *   );
     * }
     * ```
     */
    Detail: typeof Detail_2;
}

declare interface ItemProps extends ActionsInterface {
    /**
     * ID of the item. This string is passed to the `onSelectionChange` handler of the {@link List} when the item is selected.
     * Make sure to assign each item a unique ID or a UUID will be auto generated.
     */
    id?: string;
    /**
     * The main title displayed for that item, optionally with a tooltip.
     */
    title: string | {
        value: string;
        tooltip?: string | null;
    };
    /**
     * An optional subtitle displayed next to the main title, optionally with a tooltip.
     */
    subtitle?: string | {
        value?: string | null;
        tooltip?: string | null;
    };
    /**
     * An optional property used for providing additional indexable strings for search.
     * When filtering the list in Raycast through the search bar, the keywords will be searched in addition to the title.
     */
    keywords?: string[];
    /**
     * An optional icon displayed for the list item.
     */
    icon?: Image.ImageLike | {
        value: Image.ImageLike | undefined | null;
        tooltip: string;
    };
    /**
     * An optional array of {@link List.Item.Accessory} items displayed on the right side in a List.Item.
     */
    accessories?: ItemAccessory[] | undefined | null;
    /**
     * An {@link ActionPanel} that will be updated for the selected list item.
     */
    actions?: ReactNode | null;
    /**
     * The `List.Item.Detail` to be rendered in the right side area when the parent List is showing details and the item is selected.
     */
    detail?: ReactNode;
    /**
     * Optional information to preview files with Quick Look. Toggle the preview with {@link Action.ToggleQuickLook}.
     *
     * @remarks
     * If no `name` is specified, the file name of the given path is used.
     */
    quickLook?: {
        name?: string | null;
        path: string;
    };
}

declare interface ItemProps_2 extends ActionsInterface {
    /**
     * ID of the item. This string is passed to the `onSelectionChange` handler of the {@link Grid} when the item is selected.
     * Make sure to assign each item a unique ID or a UUID will be auto generated.
     */
    id?: string;
    /**
     * An image or color, optionally with a tooltip, representing the content of the grid item.
     */
    content: Image.ImageLike | {
        color: Color.ColorLike;
    } | {
        value: Image.ImageLike | {
            color: Color.ColorLike;
        };
        tooltip: string;
    };
    /**
     * An optional title displayed below the content.
     */
    title?: string;
    /**
     * An optional subtitle displayed below the title.
     */
    subtitle?: string;
    /**
     * An optional property used for providing additional indexable strings for search.
     * When filtering the list in Raycast through the search bar, the keywords will be searched in addition to the title.
     */
    keywords?: string[];
    /**
     * Optional information to preview files with Quick Look. Toggle the preview ith {@link Action.ToggleQuickLook}.
     *
     * @remarks
     * If no `name` is specified, the file name of the given path is used.
     */
    quickLook?: {
        name?: string | null;
        path: string;
    };
    /**
     * An {@link ActionPanel} that will be updated for the selected grid item.
     */
    actions?: ReactNode | null;
}

declare interface ItemProps_3 {
    /**
     * The main title displayed for this item.
     */
    title: string;
    /**
     * The subtitle displayed for this item.
     */
    subtitle?: string;
    /**
     * An optional icon for this item.
     */
    icon?: Image.ImageLike;
    /**
     * A tooltip to display when the cursor hovers the item.
     */
    tooltip?: string;
    /**
     * An action handler called when the user clicks the item.
     */
    onAction?: (event: ItemActionEvent) => void;
    /**
     * A shortcut used to invoke this item when its parent menu is open.
     */
    shortcut?: Keyboard.Shortcut;
}

export declare namespace Keyboard {
    /**
     * A keyboard shortcut is defined by one or more modifier keys (command, control, etc.) and a single key equivalent (a character or special key).
     * See {@link Keyboard.KeyModifier} and {@link  Keyboard.KeyEquivalent} for supported values.
     *
     * @example
     * ```typescript
     * import { ActionPanel, Detail, Action } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <Detail markdown="Let's play some games 👾" actions={
     *       <ActionPanel title="Game controls">
     *         <Action
     *           title="Up"
     *           shortcut={{ modifiers: ["opt"], key: "arrowUp" }}
     *           onAction={() => console.log("Go up")}
     *         />
     *         <Action
     *           title="Down"
     *           shortcut={{ modifiers: ["opt"], key: "arrowDown" }}
     *           onAction={() => console.log("Go down")}
     *         />
     *         <Action
     *           title="Left"
     *           shortcut={{ modifiers: ["opt"], key: "arrowLeft" }}
     *           onAction={() => console.log("Go left")}
     *         />
     *         <Action
     *           title="Right"
     *           shortcut={{ modifiers: ["opt"], key: "arrowRight" }}
     *           onAction={() => console.log("Go right")}
     *         />
     *       </ActionPanel>}
     *     />
     *   );
     * }
     * ```
     */
    export interface Shortcut {
        /**
         * The modifier keys of the keyboard shortcut.
         */
        modifiers: KeyModifier[];
        /**
         * The key of the keyboard shortcut.
         */
        key: KeyEquivalent;
    }
    /**
     * Modifier of a {@link Keyboard.Shortcut}
     */
    export type KeyModifier = "cmd" | "ctrl" | "opt" | "shift";
    /**
     * KeyEquivalent of a {@link Keyboard.Shortcut}
     */
    export type KeyEquivalent = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "." | "," | ";" | "=" | "+" | "-" | "[" | "]" | "{" | "}" | "«" | "»" | "(" | ")" | "/" | "\\" | "'" | "`" | "§" | "^" | "@" | "$" | "return" | "delete" | "deleteForward" | "tab" | "arrowUp" | "arrowDown" | "arrowLeft" | "arrowRight" | "pageUp" | "pageDown" | "home" | "end" | "space" | "escape" | "enter" | "backspace";
}

/**
 * See {@link Detail.Metadata.Label}
 */
declare const Label: FunctionComponent<LabelProps>;

declare interface LabelProps {
    /**
     * The title of the item.
     */
    title: string;
    /**
     * An icon to illustrate the value of the item.
     */
    icon?: Image.ImageLike | undefined | null;
    /**
     * The text value of the item.
     * Specifying `color` will display the text in the provided color. Defaults to {@link Color.SecondaryText}.
     */
    text?: string | {
        value: string;
        color?: Color | null;
    };
}

/**
 * Launches another command of the same extension. If the command does not exist, or if it's not enabled, an error will be thrown.
 * Use this method if your command needs to open another command based on user interaction,
 * or when an immediate background refresh should be triggered, for example when a command needs to update an associated menu-bar command.
 *
 * @param options - A parameter object with the properties:
 * `name`: command name as defined in the extension's manifest
 * `type`: {@link LaunchType.UserInitiated} or {@link LaunchType.Background}
 * `arguments`: optional object for the argument properties and values as defined in the extension's manifest, for example: `{ "argument1": "value1" }`
 * `context`: arbitrary object for custom data that should be passed to the command and accessible as `environment.launchContext`; the object must be JSON serializable (Dates and Buffers supported)
 * @returns A Promise that resolves when the command has been launched. (Note that this does not indicate that the launched command has finished executing.)
 *
 * @throws {@link Error} if the command does not exist or is not enabled.
 *
 * @example
 * ```typescript
 * import { launchCommand, LaunchType } from "@raycast/api";
 *
 * export default async () => {
 *   await launchCommand({ name: "list", type: LaunchType.UserInitiated, context: { "foo": "bar" } });
 * };
 * ```
 */
export declare function launchCommand(options: LaunchOptions): Promise<void>;

declare interface LaunchContext {
    /**
     * The context values for a command launch.
     */
    [item: string]: any;
}

declare type LaunchOptions = IntraExtensionLaunchOptions | InterExtensionLaunchOptions;

/**
 * The top-level props that a Command receives on launch
 */
export declare type LaunchProps<T extends {
    arguments?: Arguments;
    draftValues?: Form.Values;
    launchContext?: LaunchContext;
} = {
    arguments: Arguments;
    draftValues: Form.Values;
    launchContext?: LaunchContext;
}> = {
    /**
     * The type of launch for the command (user initiated or background).
     */
    launchType: LaunchType;
    /**
     * Use these values to populate the initial state for your command.
     */
    arguments: T["arguments"];
    /**
     * When a user enters the command via a draft, this object will contain the user inputs that were saved as a draft.
     * Use its values to populate the initial state for your Form.
     */
    draftValues?: T["draftValues"];
    /**
     * When the command is launched programmatically via `launchCommand`, this object contains the value passed to `context`.
     */
    launchContext?: T["launchContext"];
    /**
     * When the command is launched as a fallback command, this string contains the text of the root search.
     */
    fallbackText?: string;
};

export declare enum LaunchType {
    /**
     * A regular launch through user interaction
     */
    UserInitiated = "userInitiated",
    /**
     * Scheduled through an interval and launched from background
     */
    Background = "background"
}

/**
 * See {@link Detail.Metadata.Link}
 */
declare const Link: FunctionComponent<LinkProps>;

declare interface LinkProps {
    /**
     * The title shown above the item.
     */
    title: string;
    /**
     * The target of the link.
     */
    target: string;
    /**
     * The text value of the item.
     */
    text: string;
}

/**
 * Displays {@link List.Section} or {@link List.Item}, optionally {@link List.Dropdown}.
 *
 * @remarks
 * The list uses built-in filtering by indexing the title of list items and additionally keywords.
 *
 * @example
 * ```typescript
 * import { List } from "@raycast/api";
 *
 * function DrinkDropdown(props: DrinkDropdownProps) {
 *   const { isLoading = false, drinkTypes, onDrinkTypeChange } = props;
 *   return (
 *     <List.Dropdown
 *       tooltip="Select Drink Type"
 *       storeValue={true}
 *       onChange={(newValue) => {
 *         onDrinkTypeChange(newValue);
 *       }}
 *     >
 *       <List.Dropdown.Section title="Alcoholic Beverages">
 *         {drinkTypes.map((drinkType) => (
 *           <List.Dropdown.Item key={drinkType.id} title={{ value: drinkType.name, tooltip: drinkType.definition }} value={drinkType.id} />
 *         ))}
 *       </List.Dropdown.Section>
 *     </List.Dropdown>
 *   );
 * }
 *
 * export default function Command() {
 *   const drinkTypes = [
 *     { id: 1, name: 'Beer', definition: "an alcoholic drink made from yeast-fermented malt flavoured with hops" },
 *     { id: 2, name: 'Wine', definition: "an alcoholic drink made from fermented grape juice" }];
 *   const onDrinkTypeChange = (newValue) => {
 *     console.log(newValue);
 *   }
 *   return (
 *     <List
 *       navigationTitle="Search Beers"
 *       searchBarPlaceholder="Search your favorite drink"
 *       searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={onDrinkTypeChange} />}
 *     >
 *       <List.Item title="Augustiner Helles" />
 *       <List.Item title="Camden Hells" />
 *       <List.Item title="Leffe Blonde" />
 *       <List.Item title="Sierra Nevada IPA" />
 *     </List>
 *   );
 * }
 * ```
 */
export declare const List: FunctionComponent<ListProps> & ListMembers;

export declare namespace List {
    /**
     * Props of the {@link List} React component.
     */
    export type Props = ListProps;
    export namespace EmptyView {
        export type Props = EmptyViewProps;
    }
    export namespace Dropdown {
        /**
         * Props of the {@link List.Dropdown} React component.
         */
        export type Props = DropdownProps_2;
        export namespace Item {
            /**
             * Props of the {@link List.Dropdown.Item} React component.
             */
            export type Props = DropdownItemProps;
        }
        export namespace Section {
            /**
             * Props of the {@link List.Dropdown.Section} React component.
             */
            export type Props = DropdownSectionProps;
        }
    }
    export namespace Item {
        /**
         * An interface describing an accessory item in a {@link List.Item}
         *
         * @example
         * ```typescript
         * import { List } from "@raycast/api";
         *
         * export default function Command() {
         *   return (
         *     <List>
         *       <List.Item title="An Item with Accessories" accessories={[{ text: `An Accessory Text`, icon: Icon.Hammer }, { icon: Icon.Person }, { text: "Just Do It!" }]} />
         *     </List>
         *   );
         * }
         * ```
         */
        export type Accessory = ItemAccessory;
        /**
         * Props of the {@link List.Item} React component.
         */
        export type Props = ItemProps;
        export namespace Detail {
            /**
             * Props of the {@link List.Item.Detail} React component.
             */
            export type Props = DetailProps_2;
            export namespace Metadata {
                /**
                 * Props of the {@link List.Item.Detail.Metadata} React component.
                 */
                export type Props = MetadataProps;
                export namespace Label {
                    /**
                     * Props of the {@link List.Item.Detail.Metadata.Label} React component.
                     */
                    export type Props = LabelProps;
                }
                export namespace Separator {
                    /**
                     * Props of the {@link List.Item.Detail.Metadata.Separator} React component.
                     */
                    export type Props = SeparatorProps;
                }
                export namespace Link {
                    /**
                     * Props of the {@link List.Item.Detail.Metadata.Link} React component.
                     */
                    export type Props = LinkProps;
                }
                export namespace TagList {
                    /**
                     * Props of the {@link List.Item.Detail.Metadata.TagList} React component.
                     */
                    export type Props = TagListProps;
                    export namespace Item {
                        /**
                         * Props of the {@link List.Item.Detail.Metadata.TagList.Item} React component.
                         */
                        export type Props = TagListItemProps;
                    }
                }
            }
        }
    }
    export namespace Section {
        /**
         * Props of the {@link List.Section} React component.
         */
        export type Props = SectionProps_2;
    }
}

declare interface ListMembers {
    /**
     * A view to display when there aren't any items available. Use to greet users with a friendly message if the
     * extension requires user input before it can show any list items e.g. when searching for a package, an article etc.
     *
     * @remarks
     * Raycast provides a default `EmptyView` that will be displayed if the {@link List} component either has no children,
     * or if it has children, but none of them match the query in the search bar. This too can be overridden by passing
     * an empty view alongside the other `List.Item`s.
     *
     * @example
     * ```typescript
     * import { useState } from "react";
     * import { List } from "@raycast/api";
     *
     * export default function CommandWithCustomEmptyState() {
     *   const [state, setState] = useState({ searchText: "", items: [] });
     *
     *   useEffect(() => {
     *     // perform an API call that eventually populates `items`.
     *   }, [state.searchText])
     *
     *   return (
     *     <List
     *       onSearchTextChange={(newValue) =>
     *         setState((previous) => ({ ...previous, searchText: newValue }))
     *       }
     *     >
     *       {state.searchText === "" && state.items.length === 0 ? (
     *         <List.EmptyView
     *           icon={{ source: "https://placekitten.com/500/500" }}
     *           title="Type something to get started"
     *         />
     *       ) : (
     *         state.items.map((item) => <List.Item key={item} title={item} />)
     *       )}
     *     </List>
     *   );
     * }
     * ```
     */
    EmptyView: typeof EmptyView;
    /**
     * A item in the {@link List}.
     *
     * @remarks
     * This is one of the foundational UI components of Raycast. A list item represents a single entity. It can be a
     * GitHub pull request, a file, or anything else. You most likely want to perform actions on this item, so make it clear
     * to the user what this list item is about.
     *
     * @example
     * ```typescript
     * import { Icon, List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Item icon={Icon.Star} title="Augustiner Helles" subtitle="0,5 Liter" accessories={[{ text: "Germany" }]} />
     *     </List>
     *   );
     * }
     * ```
     */
    Item: typeof Item;
    /**
     * A group of related {@link List.Item}.
     *
     * @remarks
     * Sections are a great way to structure your list. For example, group GitHub issues with the same status and order them by priority.
     * This way, users can quickly access what is most relevant.
     *
     * @example
     * ```typescript
     * import { List } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <List>
     *       <List.Section title="Lager">
     *         <List.Item title="Camden Hells" />
     *       </List.Section>
     *       <List.Section title="IPA">
     *         <List.Item title="Sierra Nevada IPA" />
     *       </List.Section>
     *     </List>
     *   );
     * }
     * ```
     */
    Section: typeof Section_2;
    /**
     * A dropdown menu that will be shown in the right-hand-side of the search bar.
     *
     * @example
     * ```typescript
     * import { List } from "@raycast/api";
     *
     * function DrinkDropdown(props: DrinkDropdownProps) {
     *   const { drinkTypes, onDrinkTypeChange } = props;
     *   return (
     *     <List.Dropdown
     *       tooltip="Select Drink Type"
     *       storeValue={true}
     *       onChange={(newValue) => {
     *         onDrinkTypeChange(newValue);
     *       }}
     *     >
     *       <List.Dropdown.Section title="Alcoholic Beverages">
     *         {drinkTypes.map((drinkType) => (
     *           <List.Dropdown.Item key={drinkType.id} title={drinkType.name} value={drinkType.id} />
     *         ))}
     *       </List.Dropdown.Section>
     *     </List.Dropdown>
     *   );
     * }
     *
     * export default function Command() {
     *   const drinkTypes = [{ id: 1, name: 'Beer' }, { id: 2, name: 'Wine' }];
     *   const onDrinkTypeChange = (newValue) => {
     *     console.log(newValue);
     *   }
     *   return (
     *     <List
     *       navigationTitle="Search Beers"
     *       searchBarPlaceholder="Search your favorite drink"
     *       searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={onDrinkTypeChange} />}
     *     >
     *       <List.Item title="Augustiner Helles" />
     *       <List.Item title="Camden Hells" />
     *       <List.Item title="Leffe Blonde" />
     *       <List.Item title="Sierra Nevada IPA" />
     *     </List>
     *   );
     * }
     * ```
     */
    Dropdown: typeof Dropdown_2;
}

declare interface ListProps extends ActionsInterface, NavigationChildInterface, SearchBarInterface {
    /**
     * A reference to an {@link ActionPanel}. It will only be shown when there aren't any children.
     */
    actions?: ReactNode;
    /**
     * List sections or items. If {@link List.Item} elements are specified, a default section is automatically created.
     */
    children?: ReactNode;
    /**
     * Callback triggered when the item selection in the list changes.
     *
     * When the received id is `null`, it means that all items have been filtered out
     * and that there are no item selected
     */
    onSelectionChange?: (id: string | null) => void;
    /**
     * {@link List.Dropdown} that will be shown in the right-hand-side of the search bar.
     */
    searchBarAccessory?: ReactElement<DropdownProps_2> | undefined | null;
    /**
     * The text that will be displayed in the search bar.
     */
    searchText?: string;
    /**
     * Placeholder text that will be shown in the search bar.
     *
     * @defaultValue `"Search…"`
     */
    searchBarPlaceholder?: string;
    /**
     * Selects the item with the specified id.
     */
    selectedItemId?: string;
    /**
     * Whether the List should have an area on the right side of the items to show additional details about the selected item.
     *
     * When true, it is recommended not to show any accessories on the `List.Item` and instead show the additional information in the `List.Item.Detail` view.
     */
    isShowingDetail?: boolean;
}

export declare namespace LocalStorage {
    /**
     * Retrieve all stored values in the local storage of an extension.
     *
     * @returns A Promise that resolves with an object containing all {@link LocalStorage.Values}.
     *
     * @example
     * ```typescript
     * import { LocalStorage } from "@raycast/api";
     *
     * interface Values {
     *   todo: string;
     *   priority: number;
     * }
     *
     * export default async () => {
     *   const items = await LocalStorage.allItems<Values>();
     *   console.log(`Local storage item count: ${Object.entries(items).length}`);
     * };
     * ```
     */
    export function allItems<T extends Values = Values>(): Promise<T>;
    /**
     * Retrieve the stored value for the given key.
     *
     * @param key - The key you want to retrieve the value of.
     * @returns A Promise that resolves with the stored value for the given key. If the key does not exist, `undefined` is returned.
     *
     * @example
     * ```typescript
     * import { LocalStorage } from "@raycast/api";
     *
     * export default async () => {
     *   const item = await LocalStorage.getItem<string>("favorite-fruit");
     *   console.log(item);
     * };
     * ```
     */
    export function getItem<T extends Value = Value>(key: string): Promise<T | undefined>;
    /**
     * Stores a value for the given key.
     *
     * @param key - The key you want to create or update the value of.
     * @param value - The value you want to create or update for the given key.
     * @returns A Promise that resolves when the value is stored.
     *
     * @example
     * ```typescript
     * import { LocalStorage } from "@raycast/api";
     *
     * export default async () => {
     *   await LocalStorage.setItem("favorite-fruit", "cherry");
     * };
     * ```
     */
    export function setItem(key: string, value: Value): Promise<void>;
    /**
     * Removes the stored value for the given key.
     *
     * @param key - The key you want to remove the value of.
     * @returns A Promise that resolves when the value is removed.
     *
     * @example
     * ```typescript
     * import { LocalStorage } from "@raycast/api";
     *
     * export default async () => {
     *   await LocalStorage.removeItem("favorite-fruit");
     * };
     * ```
     */
    export function removeItem(key: string): Promise<void>;
    /**
     * Removes all stored values of an extension.
     *
     * @returns A Promise that resolves when all values are removed.
     *
     * @example
     * ```typescript
     * import { LocalStorage } from "@raycast/api";
     *
     * export default async () => {
     *   await LocalStorage.clear();
     * };
     * ```
     */
    export function clear(): Promise<void>;
    /**
     * Supported storage value types.
     *
     * @example
     * ```typescript
     * import { LocalStorage } from "@raycast/api";
     *
     * export default async () => {
     *   // string
     *   await LocalStorage.setItem("favorite-fruit", "cherry");
     *
     *   // number
     *   await LocalStorage.setItem("fruit-basket-count", 3);
     *
     *   // boolean
     *   await LocalStorage.setItem("fruit-eaten-today", true);
     * };
     * ```
     */
    export type Value = string | number | boolean;
    /**
     * Values of local storage items.
     *
     * _For type-safe values, you can define your own interface. Use the keys of the local storage items as the property names._
     */
    export interface Values {
        /**
         * The local storage value of a given key.
         */
        [key: string]: any;
    }
}

/**
 * Adds an item to the menu bar, optionally with a menu attached in case its `children` prop is non-empty.
 *
 * @remarks
 * `menu-bar` commands don't always need to return a `MenuBarExtra`. Sometimes it makes sense to remove an item from the
 * menu bar, in which case you can write your command logic to return `null` instead.
 *
 * @example
 * ```typescript
 * import { Icon, MenuBarExtra, open } from "@raycast/api";
 * import { useBookmarks } from "./hooks";
 *
 * export default function Command() {
 *   const [newBookmarks, archivedBookmarks, isLoading] = useBookmarks();
 *
 *   return (
 *     <MenuBarExtra icon={Icon.Bookmark} isLoading={isLoading}>
 *       <MenuBarExtra.Item title="New" />
 *       {newBookmarks.map((bookmark) => (
 *         <MenuBarExtra.Item key={bookmark.url} title={bookmark.name} onAction={() => open(bookmark.url)} />
 *       ))}
 *       <MenuBarExtra.Separator />
 *       <MenuBarExtra.Item title="Archived" />
 *       {archivedBookmarks.map((bookmark) => (
 *         <MenuBarExtra.Item key={bookmark.url} title={bookmark.name} onAction={() => open(bookmark.url)} />
 *       ))}
 *     </MenuBarExtra>
 *   );
 * }
 * ```
 */
export declare const MenuBarExtra: FunctionComponent<MenuBarExtraProps> & MenuBarExtraMembers;

export declare namespace MenuBarExtra {
    export type Props = MenuBarExtraProps;
    /**
     * An interface describing Action events in callbacks
     *
     * @example
     * ```typescript
     *import { MenuBarExtra } from "@raycast/api";
     *
     *export default function Command() {
     *  return (
     *    <MenuBarExtra>
     *      <MenuBarExtra.Item
     *        title="Log Action Event Type"
     *        onAction={(event: MenuBarExtra.ActionEvent) => console.log("Action Event Type", event.type)} />
     *    <MenuBarExtra>
     *  );
     *}
     * ```
     */
    export type ActionEvent = ItemActionEvent;
}

declare interface MenuBarExtraMembers {
    /**
     * An item in the {@link MenuBarExtra} or {@link MenuBarExtra.Submenu}.
     *
     * @remarks
     * An item that only provides only a `title` (and optionally `icon`) prop will be rendered as disabled. Use this to create section titles.
     *
     * @remarks
     * An item that provides an `onAction` prop alongside `title` (and optionally `icon`) will _not_ be rendered as
     * disabled. When users click this item in the menu bar, the action handler will be executed.
     *
     * @example
     * ```typescript
     * import { MenuBarExtra } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <MenuBarExtra icon="https://github.githubassets.com/favicons/favicon.png" tooltip="Your Pull Requests">
     *       <MenuBarExtra.Item title="Unseen" />
     *       <MenuBarExtra.Item
     *         title="Example Unseen Pull Request"
     *         onAction={() => {
     *           console.log("unseen pull request clicked");
     *         }}
     *       />
     *     </MenuBarExtra>
     *   );
     * }
     * ```
     */
    Item: typeof Item_3;
    /**
     * A group of related {@link MenuBarExtra.Item} or {@link MenuBarExtra.Submenu}.
     *
     * @remarks
     * {@link MenuBarExtra.Submenu}s reveal their items when people interact with them. They're a good way to group items
     * that naturally belong together, but keep in mind that submenus add complexity to your interface - so use them
     * sparingly!
     *
     * @example
     * ```typescript
     * import { MenuBarExtra } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <MenuBarExtra icon="https://github.githubassets.com/favicons/favicon.png" tooltip="Your Pull Requests">
     *       <MenuBarExtra.Submenu title="Submenu With Item">
     *         <MenuBarExtra.Item title="Item" />
     *       </MenuBarExtra.Submenu>
     *       <MenuBarExtra.Submenu title="Disabled Submenu" />
     *       <MenuBarExtra.Submenu title="Submenu With Submenu">
     *         <MenuBarExtra.Submenu title="Child Submenu">
     *           <MenuBarExtra.Item title="Item" />
     *         </MenuBarExtra.Submenu>
     *       </MenuBarExtra.Submenu>
     *     </MenuBarExtra>
     *   );
     * }
     * ```
     */
    Submenu: typeof Submenu_2;
    /**
     * A section of related {@link MenuBarExtra.Item} or {@link MenuBarExtra.Submenu} with an optional title.
     *
     * @example
     * ```typescript
     * import { MenuBarExtra } from "@raycast/api";
     *
     * export default function Command() {
     *   return (
     *     <MenuBarExtra icon="https://github.githubassets.com/favicons/favicon.png" tooltip="Your Pull Requests">
     *       <MenuBarExtra.Section title="Open Pull Requests">
     *         <MenuBarExtra.Item title="Add an amazing feature" subtitle="#1" />
     *       </MenuBarExtra.Section>
     *       <MenuBarExtra.Section title="Closed Pull Requests" />
     *         <MenuBarExtra.Item title="Fixed gnarly bug" subtitle="#2" />
     *       </MenuBarExtra.Section>
     *     </MenuBarExtra>
     *   );
     * }
     * ```
     */
    Section: typeof Section;
}

declare interface MenuBarExtraProps {
    /**
     * Indicates to Raycast that it should not unload the command, as it is still executing. If you set make use of `isLoading`, you need to make sure you set it to `false` at the end of the task you are executing (such as an API call), so Raycast can then unload the command.
     * @defaultValue `false`
     */
    isLoading?: boolean;
    /**
     * The string that is displayed in the menu bar.
     */
    title?: string;
    /**
     * A tooltip to display when the cursor hovers the item in the menu bar.
     */
    tooltip?: string;
    /**
     * The icon that is displayed in the menu bar.
     */
    icon?: Image.ImageLike;
    /**
     * `MenuBarExtra.Item`s, `MenuBarExtra.Submenu`s, `MenuBarExtra.Separator` or a mix of either.
     */
    children?: ReactNode;
}

/**
 * See {@link Detail.Metadata}
 */
declare const Metadata: FunctionComponent<MetadataProps> & MetadataMembers;

declare interface MetadataMembers {
    /**
     * A single value with an optional icon.
     */
    Label: typeof Label;
    /**
     * A metadata item that shows a separator line. Use it for grouping and visually separating metadata items.
     */
    Separator: typeof Separator;
    /**
     * An item to display a link.
     */
    Link: typeof Link;
    /**
     * A list of {@link Detail.Metadata.TagList.Item} displayed in a row.
     */
    TagList: typeof TagList;
}

declare interface MetadataProps {
    /**
     * The elements of the Metadata view.
     */
    children: ReactNode;
}

/**
 * Return type of the {@link useNavigation} hook to perform push and pop actions.
 */
export declare interface Navigation {
    /**
     * Push a new view component to the navigation stack.
     *
     * @param component - The React component to push to the navigation stack.
     */
    push: (component: ReactNode) => void;
    /**
     * Pop current view component from the navigation stack.
     */
    pop: () => void;
}

/**
 * Views that can be embedded in a navigation stack, show a navigation title and support a loading bar.
 */
declare interface NavigationChildInterface {
    /**
     *
     * The main title for that view displayed in Raycast
     *
     * @defaultValue Command title
     */
    navigationTitle?: string;
    /**
     * Indicates whether a loading bar should be shown or hidden below the search bar
     *
     * @defaultValue `false`
     */
    isLoading?: boolean;
}

export declare namespace OAuth {
    export namespace PKCEClient {
        /**
         * The options for creating a new {@link OAuth.PKCEClient}.
         */
        export interface Options {
            /**
             * The redirect method for the OAuth flow.
             * Make sure to set this to the correct method for the provider, see {@link OAuth.RedirectMethod} for more information.
             */
            redirectMethod: RedirectMethod;
            /**
             * The name of the provider, displayed in the OAuth overlay.
             */
            providerName: string;
            /**
             * An icon displayed in the OAuth overlay.
             * Make sure to provide at least a size of 64x64 pixels.
             */
            providerIcon?: Image.ImageLike;
            /**
             * An optional ID for associating the client with a provider.
             * Only set this if you use multiple different clients in your extension.
             */
            providerId?: string;
            /**
             * An optional description, shown in the OAuth overlay.
             * You can use this to customize the message for the end user, for example for handling scope changes or other migrations.
             * Raycast shows a default message if this is not configured.
             */
            description?: string;
        }
    }
    /**
     * A client for the [OAuth PKCE extension](https://datatracker.ietf.org/doc/html/rfc7636).
     *
     * @example
     * ```typescript
     * import { OAuth } from "@raycast/api";
     *
     * const client = new OAuth.PKCEClient({
     *   redirectMethod: OAuth.RedirectMethod.Web,
     *   providerName: "Twitter",
     *   providerIcon: "twitter-logo.png",
     *   description: "Connect your Twitter account…",
     * });
     * ```
     */
    export class PKCEClient {
        redirectMethod: RedirectMethod;
        providerName: string;
        providerIcon?: Image.ImageLike;
        providerId?: string;
        description?: string;
        private resolvesOnRedirect?;
        constructor(options: PKCEClient.Options);
        /**
         * Creates an authorization request for the provided authorization endpoint, client ID, and scopes.
         * You need to first create the authorization request before calling {@link OAuth.PKCEClient.authorize}.
         *
         * @remarks The generated code challenge for the PKCE request uses the S256 method.
         *
         * @returns A promise for an {@link OAuth.AuthorizationRequest} that you can use as input for {@link OAuth.PKCEClient.authorize}.
         */
        authorizationRequest(options: AuthorizationRequestOptions): Promise<AuthorizationRequest>;
        /**
         * Starts the authorization and shows the OAuth overlay in Raycast.
         * As parameter you can either directly use the returned request from {@link OAuth.PKCEClient.authorizationRequest},
         * or customize the URL by extracting parameters from {@link OAuth.AuthorizationRequest} and providing your own URL via {@link AuthorizationOptions}.
         * Eventually the URL will be used to open the authorization page of the provider in the web browser.
         *
         * @returns A promise for an {@link OAuth.AuthorizationResponse}, which contains the authorization code needed for the token exchange.
         * The promise is resolved when the user was redirected back from the provider's authorization page to the Raycast extension.
         */
        authorize(options: AuthorizationRequest | AuthorizationOptions): Promise<AuthorizationResponse>;
        private authorizationURL;
        /**
         * Securely stores a {@link OAuth.TokenSet} for the provider. Use this after fetching the access token from the provider.
         * If the provider returns a a standard OAuth JSON token response, you can directly pass the {@link OAuth.TokenResponse}.
         * At a minimum, you need to set the {@link OAuth.TokenSet.accessToken}, and typically you also set {@link OAuth.TokenSet.refreshToken} and {@link OAuth.TokenSet.isExpired}.
         * Raycast automatically shows a logout preference for the extension when a token set was saved.
         *
         * @remarks If you want to make use of the convenience {@link OAuth.TokenSet.isExpired} method, the property {@link OAuth.TokenSet.expiresIn} must be configured.
         *
         * @returns A promise that resolves when the token set has been stored.
         */
        setTokens(options: TokenSetOptions | TokenResponse): Promise<void>;
        /**
         * Retrieves the stored {@link OAuth.TokenSet} for the client.
         * You can use this to initially check whether the authorization flow should be initiated or
         * the user is already logged in and you might have to refresh the access token.
         *
         * @returns A promise that resolves when the token set has been retrieved.
         */
        getTokens(): Promise<TokenSet | undefined>;
        /**
         * Removes the stored {@link OAuth.TokenSet} for the client.
         *
         * @remarks Raycast automatically shows a logout preference that removes the token set.
         * Use this method only if you need to provide an additional logout option in your extension or you want to remove the token set because of a migration.
         *
         */
        removeTokens(): Promise<void>;
    }
    /**
     * Defines the supported redirect methods for the OAuth flow.
     * You can choose between web and app-scheme redirect methods, depending on what the provider requires when setting up the OAuth app.
     * For examples on what redirect URI you need to configure, see the docs for each method.
     */
    export enum RedirectMethod {
        /**
         * Use this type for a redirect back to the Raycast website, which will then open the extension.
         * In the OAuth app, configure `https://raycast.com/redirect?packageName=Extension`
         * (This is a static redirect URL for all extensions.)
         * If the provider does not accept query parameters in redirect URLs, you can alternatively use `https://raycast.com/redirect/extension`
         * and then customize the {@link OAuth.AuthorizationRequest} via its `extraParameters` property. For example add:
         *  `extraParameters: { "redirect_uri": "https://raycast.com/redirect/extension" }`
         */
        Web = "web",
        /**
         * Use this type for an app-scheme based redirect that directly opens Raycast.
         * In the OAuth app, configure `raycast://oauth?package_name=Extension`
         */
        App = "app",
        /**
         * Use this type for a URI-style app scheme that directly opens Raycast.
         * In the OAuth app, configure `com.raycast:/oauth?package_name=Extension`
         * (Note the single slash - Google, for example, would require this flavor for an OAuth app where the Bundle ID is `com.raycast`)
         */
        AppURI = "appURI"
    }
    /**
     * The options for an authorization request via {@link OAuth.PKCEClient.authorizationRequest}.
     */
    export interface AuthorizationRequestOptions {
        /**
         * The URL to the authorization endpoint for the OAuth provider.
         */
        endpoint: string;
        /**
         * The client ID of the configured OAuth app.
         */
        clientId: string;
        /**
         * A space-delimited list of scopes for identifying the resources to access on the user's behalf.
         * The scopes are typically shown to the user on the provider's consent screen in the browser.
         * Note that some providers require the same scopes be configured in the registered OAuth app.
         */
        scope: string;
        /**
         * Optional additional parameters for the authorization request.
         * Note that some providers require additional parameters, for example to obtain long-lived refresh tokens.
         */
        extraParameters?: Record<string, string>;
    }
    /**
     * Values of {@link OAuth.AuthorizationRequest}.
     * The PKCE client automatically generates the values for you and returns them for {@link OAuth.PKCEClient.authorizationRequest}.
     */
    export interface AuthorizationRequestURLParams {
        /**
         * The PKCE `code_challenge` value.
         */
        codeChallenge: string;
        /**
         * The PKCE `code_verifier` value.
         */
        codeVerifier: string;
        /**
         * The OAuth `state` value.
         */
        state: string;
        /**
         * The OAuth `redirect_uri` value.
         */
        redirectURI: string;
    }
    /**
     * The request returned by {@link OAuth.PKCEClient.authorizationRequest}.
     * Can be used as direct input to {@link OAuth.PKCEClient.authorize}, or
     * to extract parameters for constructing a custom URL in {@link OAuth.AuthorizationOptions}.
     */
    export interface AuthorizationRequest extends AuthorizationRequestURLParams {
        /**
         * Constructs the full authorization URL.
         */
        toURL(): string;
    }
    /**
     * Options for customizing {@link OAuth.PKCEClient.authorize}.
     * You can use values from {@link OAuth.AuthorizationRequest} to build your own URL.
     */
    export interface AuthorizationOptions {
        /**
         * The full authorization URL.
         */
        url: string;
    }
    /**
     * The response returned by {@link OAuth.PKCEClient.authorize}, containing the authorization code after the provider redirect.
     * You can then exchange the authorization code for an access token using the provider's token endpoint.
     */
    export interface AuthorizationResponse {
        /**
         * The authorization code from the OAuth provider.
         */
        authorizationCode: string;
    }
    /**
     * Describes the TokenSet created from an OAuth provider's token response.
     * The `accessToken` is the only required parameter but typically OAuth providers also return a refresh token, an expires value, and the scope.
     * Securely store a token set via {@link OAuth.PKCEClient.setTokens} and retrieve it via {@link OAuth.PKCEClient.getTokens}.
     */
    export interface TokenSet {
        /**
         * The access token returned by an OAuth token request.
         */
        accessToken: string;
        /**
         * An optional refresh token returned by an OAuth token request.
         */
        refreshToken?: string;
        /**
         * An optional id token returned by an identity request (e.g. /me, Open ID Connect).
         */
        idToken?: string;
        /**
         * An optional expires value (in seconds) returned by an OAuth token request.
         */
        expiresIn?: number;
        /**
         * The optional space-delimited list of scopes returned by an OAuth token request.
         * You can use this to compare the currently stored access scopes against new access scopes the extension might require in a future version,
         * and then ask the user to re-authorize with new scopes.
         */
        scope?: string;
        /**
         * The date when the token set was stored via {@link OAuth.PKCEClient.setTokens}.
         */
        updatedAt: Date;
        /**
         * A convenience method for checking whether the access token has expired.
         * The method factors in some seconds of "buffer", so it returns true a couple of seconds before the actual expiration time.
         * This requires the `expiresIn` parameter to be set.
         */
        isExpired(): boolean;
    }
    /**
     * Options for a {@link OAuth.TokenSet} to store via {@link OAuth.PKCEClient.setTokens}.
     */
    export interface TokenSetOptions {
        /**
         * The access token returned by an OAuth token request.
         */
        accessToken: string;
        /**
         * An optional refresh token returned by an OAuth token request.
         */
        refreshToken?: string;
        /**
         * An optional id token returned by an identity request (e.g. /me, Open ID Connect).
         */
        idToken?: string;
        /**
         * An optional expires value (in seconds) returned by an OAuth token request.
         */
        expiresIn?: number;
        /**
         * The optional scope value returned by an OAuth token request.
         */
        scope?: string;
    }
    /**
     * Defines the standard JSON response for an OAuth token request.
     * The response can be directly used to store a {@link OAuth.TokenSet} via {@link OAuth.PKCEClient.setTokens}.
     */
    export interface TokenResponse {
        /**
         * The `access_token` value returned by an OAuth token request.
         */
        access_token: string;
        /**
         * An optional `refresh_token` value returned by an OAuth token request.
         */
        refresh_token?: string;
        /**
         * An optional `id_token` value returned by an identity request (e.g. /me, Open ID Connect).
         */
        id_token?: string;
        /**
         * An optional `expires_in` value (in seconds) returned by an OAuth token request.
         */
        expires_in?: number;
        /**
         * The optional `scope` value returned by an OAuth token request.
         */
        scope?: string;
    }
}

/**
 * Opens a target with the default application or specified application.
 *
 * @param target - The file, folder or URL to open.
 * @param application - The application name to use for opening the file. If no application is specified, the default application as determined by the system
 * is used to open the specified file. Note that you can use the application name, app identifier, or absolute path to the app.
 * @returns A Promise that resolves when the target has been opened.
 *
 * @example
 * ```typescript
 * import { open } from "@raycast/api";
 *
 * export default async () => {
 *   await open("https://www.raycast.com", "com.google.Chrome");
 * };
 * ```
 */
export declare function open(target: string, application?: Application | string): Promise<void>;

/**
 * Opens Raycast's preference window and selects the current command.
 */
export declare function openCommandPreferences(): Promise<void>;

/**
 * Opens Raycast's preference window and selects the current extension.
 */
export declare function openExtensionPreferences(): Promise<void>;



/**
 * See {@link Form.PasswordField}
 */
declare const PasswordField: ForwardRefExoticComponent<PasswordFieldProps & RefAttributes<PasswordFieldRef>>;

/**
 * See {@link Form.PasswordField.Props}
 */
declare interface PasswordFieldProps extends FormItemProps<string> {
    /**
     * Placeholder text shown in the password field.
     */
    placeholder?: string;
}

/**
 * Form.PasswordField Ref type.
 */
declare type PasswordFieldRef = FormItemRef;

/**
 * Pops the navigation stack back to root search.
 *
 * @param options - Can be used to clear the search bar. Defaults to clearing the search bar after popped to root.
 * @returns A Promise that resolves when Raycast popped to root.
 *
 * @example
 * ```typescript
 * import { Detail, popToRoot } from "@raycast/api";
 * import { useEffect } from "react";
 * import { setTimeout } from "timers";
 *
 * export default function Command() {
 *   useEffect(() => {
 *     setTimeout(() => {
 *       popToRoot({ clearSearchBar: true });
 *     }, 3000);
 *   }, []);
 *
 *   return <Detail markdown="See you soon 👋" />;
 * }
 * ```
 */
export declare function popToRoot(options?: {
    clearSearchBar?: boolean;
}): Promise<void>;

/**
 * Defines the pop to root behavior when the main window is closed.
 */
export declare enum PopToRootType {
    /**
     * Respects the user's "Pop to Root Search" preference in Raycast
     */
    Default = "default",
    /**
     * Immediately pops back to root
     */
    Immediate = "immediate",
    /**
     * Prevents Raycast from popping back to root
     */
    Suspended = "suspended"
}

/**
 * Values of preference items.
 */
export declare interface PreferenceValues {
    [name: string]: any;
}

/**
 * Views that support a search bar.
 */
export declare interface SearchBarInterface {
    /**
     * Toggles Raycast filtering. When `true`, Raycast will use the query in the search bar to filter the
     * items. When `false`, the extension needs to take care of the filtering.
     *
     * You can further define how native filtering orders sections by setting an object with a `keepSectionOrder` property:
     * When `true`, ensures that Raycast filtering maintains the section order as defined in the extension.
     * When `false`, filtering may change the section order depending on the ranking values of items.
     *
     * @defaultValue `false` when `onSearchTextChange` is specified, `true` otherwise.
     */
    filtering?: boolean | {
        keepSectionOrder: boolean;
    };
    /**
     * Indicates whether a loading indicator should be shown or hidden next to the search bar
     *
     * @defaultValue `false`
     */
    isLoading?: boolean;
    /**
     * Defines whether the `onSearchTextChange` handler will be triggered on every keyboard press or with a delay for throttling the events.
     * Recommended to set to `true` when using custom filtering logic with asynchronous operations (e.g. network requests).
     * @defaultValue `false`
     */
    throttle?: boolean;
    /**
     * Callback triggered when the search bar text changes.
     *
     * @remarks
     * Specifying this implicitly toggles `filtering` to false. To enable native filtering when using `onSearchTextChange`, explicitly set `filtering` to true.
     */
    onSearchTextChange?: (text: string) => void;
}

/**
 * See {@link ActionPanel.Section}, {@link MenuBarExtra.Section}
 */
export declare const Section: FunctionComponent<SectionProps>;

/**
 * See {@link List.Section}
 */
declare const Section_2: FunctionComponent<SectionProps_2>;

/**
 * See {@link Grid.Section}
 */
declare const Section_3: FunctionComponent<SectionProps_3>;

/**
 * See {@link ActionPanel.Section}.
 */
export declare interface SectionProps {
    /**
     * The item elements of the section.
     */
    children?: ReactNode;
    /**
     * Title displayed above the section
     */
    title?: string;
}

declare interface SectionProps_2 extends SectionProps {
    /**
     * An optional subtitle displayed next to the title of the section.
     */
    subtitle?: string;
}

declare interface SectionProps_3 extends SectionProps {
    /**
     * Column count for the section. Minimum value is 1, maximum value is 8.
     *
     * @defaultValue 5
     */
    columns?: number;
    /**
     * Aspect ratio for the {@link Grid.Item} elements. Defaults to 1.
     */
    aspectRatio?: `${GridAspectRatio}`;
    /**
     * Fit for the {@link Grid.Item} element content. Defaults to "contain"
     */
    fit?: GridFit;
    /**
     * Inset for the {@link Grid.Item} element content. Defaults to "none".
     */
    inset?: GridInset;
}

/**
 * See {@link Form.Separator}, {@link Detail.Metadata.Separator}, {@link MenuBarExtra.Separator}, 
 */
declare const Separator: FunctionComponent<SeparatorProps>;

/**
 * See {@link Form.Separator.Props}
 */
declare interface SeparatorProps {
}

/**
 * A HUD will automatically hide the main window and show a compact message at the bottom of the screen.
 *
 * @param title - The title that will be displayed in the HUD.
 * @returns A Promise that resolves when the HUD is shown.
 *
 * @example
 * ```typescript
 * import { showHUD } from "@raycast/api";
 *
 * export default async () => {
 *   await showHUD("Hey there 👋");
 * };
 * ```
 */
export declare function showHUD(title: string): Promise<void>;

/**
 * Utils
 */
/**
 * Shows a file or directory in the Finder.
 *
 * @param path - The path to show in the Finder.
 * @returns A Promise that resolves when the item is revealed in the Finder.
 *
 * @example
 * ```typescript
 * import { showInFinder } from "@raycast/api"
 * import { homedir } from "os"
 * import { join } from "path"
 * showInFinder(join(homedir(), "Downloads"))
 * ```
 */
export declare function showInFinder(path: PathLike): Promise<void>;

/**
 * Creates and shows a Toast with the given {@link Toast.Options}.
 *
 * @param options - The options to customize the Toast.
 * @returns A Promise that resolves with the shown Toast. The Toast can be used to change or hide it.
 *
 * @example
 * ```typescript
 * import { showToast, Toast } from "@raycast/api";
 *
 * export default async () => {
 *   const success = false;
 *
 *   if (success) {
 *     await showToast({ title: "Dinner is ready", message: "Pizza margherita" });
 *   } else {
 *     await showToast({ style: Toast.Style.Failure, title: "Dinner isn't ready", message: "Pizza dropped on the floor" });
 *   }
 * };
 * ```
 *
 * When showing an animated Toast, you can later on update it:
 * @example
 * ```typescript
 * import { showToast, Toast } from "@raycast/api";
 * import { setTimeout } from "timers/promises";
 *
 * export default async () => {
 *   const toast = await showToast({ style: Toast.Style.Animated, title: "Uploading image" });
 *
 *   try {
 *    // upload the image
 *    await setTimeout(1000);
 *
 *    toast.style = Toast.Style.Success;
 *    toast.title = "Uploaded image";
 *  } catch (err) {
 *    toast.style = Toast.Style.Failure;
 *    toast.title = "Failed to upload image";
 *    toast.message = err.message;
 *  }
 * };
 * ```
 */
export declare function showToast(options: Toast.Options): Promise<Toast>;

export declare function showToast(style: Toast.Style, title: string, message?: string): Promise<Toast>;

/**
 * See {@link MenuBarExtra.Submenu}
 */
declare const Submenu_2: FunctionComponent<SubmenuProps_2>;

declare interface SubmenuProps_2 {
    /**
     * The main title displayed for this submenu.
     */
    title: string;
    /**
     * An optional icon for this submenu.
     */
    icon?: Image.ImageLike;
    /**
     * `MenuBarExtra.Item`s, `MenuBarExtra.Submenu`s, `MenuBarExtra.Separator` or a mix of either.
     */
    children?: ReactNode;
}

/**
 * See {@link Detail.Metadata.TagList}
 */
declare const TagList: FunctionComponent<TagListProps> & TagListMembers;

/**
 * See {@link Detail.Metadata.TagList.Item}
 */
declare const TagListItem: FunctionComponent<TagListItemProps>;

declare interface TagListItemProps {
    /**
     * An optional icon in front of the text of the tag.
     */
    icon?: Image.ImageLike | undefined | null;
    /**
     * The text of the tag.
     */
    text: string;
    /**
     * Changes the text color to the provided color and sets a transparent background with the same color.
     */
    color?: Color.ColorLike | undefined | null;
}

declare interface TagListMembers {
    /**
     * A Tag in a {@link Detail.Metadata.TagList}.
     */
    Item: typeof TagListItem;
}

declare interface TagListProps {
    /**
     * The title shown above the item.
     */
    title: string;
    /**
     * The tags contained in the TagList.
     */
    children: ReactNode;
}

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
declare interface TagPickerItemProps {
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
declare interface TagPickerProps extends FormItemProps<string[]> {
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
 * Form.TagPicker Ref type.
 */
declare type TagPickerRef = FormItemRef;

/**
 * See {@link Form.TextArea}
 */
declare const TextArea: ForwardRefExoticComponent<TextAreaProps & RefAttributes<TextAreaRef>>;

/**
 * See {@link Form.TextArea.Props}
 */
declare interface TextAreaProps extends FormItemProps<string> {
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
declare type TextAreaRef = FormItemRef;

/**
 * See {@link Form.TextField}
 */
declare const TextField: ForwardRefExoticComponent<TextFieldProps & RefAttributes<TextFieldRef>>;

/**
 * See {@link Form.TextField.Props}
 */
declare interface TextFieldProps extends FormItemProps<string> {
    /**
     * Placeholder text shown in the text field.
     */
    placeholder?: string;
}

declare type TextFieldRef = FormItemRef;

/**
 * A Toast with a certain style, title, and message.
 *
 * @example
 * ```typescript
 * import { showToast, Toast } from "@raycast/api";
 * import { setTimeout } from "timers/promises";
 *
 * export default async () => {
 *   const toast = await showToast({ style: Toast.Style.Animated, title: "Uploading image" });
 *
 *   await setTimeout(1000);
 *
 *   toast.style = Toast.Style.Success;
 *   toast.title = "Uploaded image";
 * };
 * ```
 */
export declare class Toast {
    private options;
    private id;
    private callbacks;
    /**
     * The style of a Toast.
     */
    get style(): Toast.Style;
    set style(style: Toast.Style);
    /**
     * The title of a Toast. Displayed on the top.
     */
    get title(): string;
    set title(title: string);
    /**
     * An additional message for the Toast. Useful to show more information, e.g. an identifier of a newly created asset.
     */
    get message(): string | undefined;
    set message(message: string | undefined);
    /**
     * The primary Action the user can take when hovering on the Toast.
     */
    get primaryAction(): Toast.ActionOptions | undefined;
    set primaryAction(action: Toast.ActionOptions | undefined);
    /**
     * The secondary Action the user can take when hovering on the Toast.
     */
    get secondaryAction(): Toast.ActionOptions | undefined;
    set secondaryAction(action: Toast.ActionOptions | undefined);
    /**
     * Shows the Toast.
     *
     * @returns A Promise that resolves when the toast is shown.
     */
    show(): Promise<void>;
    /**
     * Hides the Toast.
     *
     * @returns A Promise that resolves when toast is hidden.
     */
    hide(): Promise<void>;
    private update;
}

export declare namespace Toast {
    /**
     * The options to create a {@link Toast}.
     *
     * @example
     * ```typescript
     * import { showToast, Toast } from "@raycast/api";
     *
     * export default async () => {
     *   const options: Toast.Options = {
     *     style: Toast.Style.Success,
     *     title: "Finished cooking",
     *     message: "Delicious pasta for lunch",
     *     primaryAction: {
     *       title: 'Do something',
     *       onAction: () => {
     *         console.log("The toast action has been triggered")
     *       }
     *     }
     *   };
     *   await showToast(options);
     * };
     * ```
     */
    export interface Options {
        /**
         * The title of a Toast. Displayed on the top.
         */
        title: string;
        /**
         * An additional message for the Toast. Useful to show more information, e.g. an identifier of a newly created asset.
         */
        message?: string;
        /**
         * The style of a Toast.
         */
        style?: Style;
        /**
         * The primary Action the user can take when hovering on the Toast.
         */
        primaryAction?: ActionOptions;
        /**
         * The secondary Action the user can take when hovering on the Toast.
         */
        secondaryAction?: ActionOptions;
    }
    /**
     * The options to create a {@link Toast} Action.
     */
    export interface ActionOptions {
        /**
         * The title of the action.
         */
        title: string;
        /**
         * The keyboard shortcut for the action.
         */
        shortcut?: Keyboard.Shortcut;
        /**
         * A callback called when the action is triggered.
         */
        onAction: (toast: Toast) => void;
    }
    /**
     * Defines the visual style of the Toast.
     *
     * @remarks
     * Use {@link Toast.Style.Success} for confirmations and {@link Toast.Style.Failure} for displaying errors.
     * Use {@link Toast.Style.Animated} when your Toast should be shown until a process is completed.
     * You can hide it later by using {@link Toast.hide} or update the properties of an existing Toast.
     */
    export enum Style {
        Success = "SUCCESS",
        Failure = "FAILURE",
        Animated = "ANIMATED"
    }
}

/**
 * Moves a file or directory to the Trash.
 *
 * @param paths - The item or items to move to the trash.
 * @returns A Promise that resolves when all files are moved to the trash.
 *
 * @example
 * ```typescript
 * import { trash } from "@raycast/api";
 * import { writeFile } from "fs/promises";
 * import { homedir } from "os";
 *
 * export default async () => {
 *   const file = `${homedir()}/Desktop/yolo.txt`;
 *   await writeFile(file, "I will be deleted soon!");
 *   await trash(file);
 * };
 * ```
 */
export declare function trash(path: PathLike | PathLike[]): Promise<void>;

/**
 * Update the values of properties declared in the manifest of a command.
 *
 * @param metadata - An object with the values for the manifest properties to update.
 * Note that currently only `subtitle` is supported. Pass `null` to clear the custom subtitle.
 * @returns A Promise that resolves when the metadata has been updated.
 *
 * @example
 * ```typescript
 * import { updateCommandMetadata } from "@raycast/api";
 *
 * export default async () => {
 *   await updateCommandMetadata({ subtitle: "My new subtitle" });
 * };
 * ```
 * @remarks The actual manifest file is not modified, so the update applies as
 * long as the command remains installed.
 */
export declare function updateCommandMetadata(metadata: {
    subtitle?: string | null;
}): Promise<void>;

/**
 * A hook that lets you push and pop view components in the navigation stack.
 *
 * @remarks
 * You most likely won't use this hook too often. To push a new component, use the {@link PushAction}.
 * When a user presses `ESC`, we automatically push to the previous component.
 *
 * @returns A {@link Navigation} object with {@link Navigation.push} and {@link Navigation.pop} functions.
 * Use the functions to alter the navigation stack.
 *
 * @example
 * ```typescript
 * import { ActionPanel, Detail, useNavigation, Action } from "@raycast/api";
 *
 * function Ping() {
 *   const { push } = useNavigation();
 *
 *   return (
 *     <Detail
 *       markdown="Ping"
 *       actions={
 *         <ActionPanel>
 *           <Action title="Push" onAction={() => push(<Pong />)} />
 *         </ActionPanel>
 *       }
 *     />
 *   );
 * }
 *
 * function Pong() {
 *   const { pop } = useNavigation();
 *
 *   return (
 *     <Detail
 *       markdown="Pong"
 *       actions={
 *         <ActionPanel>
 *           <Action title="Pop" onAction={pop} />
 *         </ActionPanel>
 *       }
 *     />
 *   );
 * }
 *
 * export default function Command() {
 *   return <Ping />;
 * }
 * ```
 */
export declare function useNavigation(): Navigation;

export { }