declare var NSObject, NSString, android, java;

export class SharedService {
  public static IS_NATIVESCRIPT() {
    return ((typeof NSObject !== 'undefined' && typeof NSString !== 'undefined') || (typeof android !== 'undefined' && typeof java !== 'undefined'));
  }
}
