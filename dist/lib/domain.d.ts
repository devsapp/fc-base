export interface DomainConfig {
    Domain: string;
    Protocol: string[];
    CertConfig: DomainCertConfig;
    Routes?: RoutesConfig[];
}
export interface DomainCertConfig {
    CertName?: string;
    PrivateKey?: string;
    Certificate?: string;
}
export interface RoutesConfig {
    Path?: string;
    Qualifier?: string;
}
