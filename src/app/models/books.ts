// This is the actual blueprint to be used for the book list after the mapping

export interface ItemVM {
  id: string;
  title: string;
  author: string;
}


// Everything below this line is the structure as it comes from the google api

export interface BookItem {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
}

export interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: PDF;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

export interface Epub {
    isAvailable: boolean;
}

export interface PDF {
    isAvailable: boolean;
    acsTokenLink: string;
}

export interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
}

export interface SearchInfo {
    textSnippet: string;
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    readingModes: ReadingModes;
    printType: string;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export interface ReadingModes {
    text: boolean;
    image: boolean;
}
