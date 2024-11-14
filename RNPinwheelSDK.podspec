Pod::Spec.new do |s|
    s.name         = "RNPinwheelSDK"
    s.version      = "3.1.1"
    s.summary      = "React Native plugin for Pinwheel's SDK"
    s.description  = <<-DESC
                     An open source React Native plugin for calling Pinwheel's native SDKs to manage payroll data.
                     DESC
    s.homepage     = "https://github.com/underdog-tech/react-native-pinwheel"
    s.license      = { :file => 'LICENSE' }
    s.author       = { 'Pinwheel' => 'info@pinwheelapi.com' }
    s.platform     = :ios, "12.0"
    s.source       = { :path => 'ios' }
    s.source_files  = "ios/**/*.{h,m}"
    s.public_header_files = 'ios/**/*.h'
    s.requires_arc = true
    s.dependency "React"
    s.dependency 'PinwheelSDK', '3.1.1'
  end
