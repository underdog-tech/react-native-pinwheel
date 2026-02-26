import Foundation
import PinwheelSDK
import UIKit

@objc public protocol PWPinwheelWrapperDelegate {
  func onEvent(name: String, event: [String: AnyObject])
}

@objcMembers
public final class PWPinwheelWrapperVC: UIViewController {
  private let token: String
  private let delegateBridge: PWPinwheelWrapperDelegate

  private let useSecureOrigin: Bool
  private let useDarkMode: Bool
  private let sdk: String
  private let version: String

  private var pinwheelVC: PinwheelViewController?

  public init(
    token: String,
    delegate: PWPinwheelWrapperDelegate,
    sdk: String,
    version: String,
    useSecureOrigin: Bool,
    useDarkMode: Bool = false,
    useAppBoundDomains: Bool = false,
    useAppBoundDomainsForNativeLink: Bool = false
  ) {
    self.token = token
    self.delegateBridge = delegate
    self.sdk = sdk
    self.version = version
    self.useSecureOrigin = useSecureOrigin
    self.useDarkMode = useDarkMode
    super.init(nibName: nil, bundle: nil)

    var config = PinwheelConfig(mode: .sandbox, environment: .production, sdk: sdk, version: version)
    config.useSecureOrigin = useSecureOrigin

    let vc = PinwheelViewController(
      token: token,
      delegate: self,
      config: config,
      useDarkMode: useDarkMode,
      useAppBoundDomains: useAppBoundDomains,
      useAppBoundDomainsForNativeLink: useAppBoundDomainsForNativeLink
    )
    self.pinwheelVC = vc
  }

  public required init?(coder: NSCoder) {
    nil
  }

  public override func viewDidLoad() {
    super.viewDidLoad()
    guard let pinwheelVC else { return }

    addChild(pinwheelVC)
    view.addSubview(pinwheelVC.view)
    pinwheelVC.didMove(toParent: self)

    pinwheelVC.view.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint.activate([
      pinwheelVC.view.topAnchor.constraint(equalTo: view.topAnchor),
      pinwheelVC.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
      pinwheelVC.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
      pinwheelVC.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
    ])
  }
}

// MARK: - PinwheelDelegate

extension PWPinwheelWrapperVC: PinwheelDelegate {
  public func onEvent(name: PinwheelEventType, event: PinwheelEventPayload?) {
    var payload: [String: AnyObject] = [:]

    if let event {
      do {
        let json = try event.jsonString()
        if let jsonData = json.data(using: .utf8) {
          let jsonObject = try JSONSerialization.jsonObject(with: jsonData)
          if let jsonDictionary = jsonObject as? [String: AnyObject] {
            payload = jsonDictionary
          }
        }
      } catch {
        // Best-effort payload serialization; still forward event name.
      }
    }

    delegateBridge.onEvent(name: name.rawValue, event: payload)
  }
}
