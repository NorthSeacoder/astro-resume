interface AnalyticsProps {
  websiteId: string;
  scriptSrc?: string;
}

const Analytics = ({ 
  websiteId,
  scriptSrc = 'https://analytics.umami.is/script.js'  // umami 默认脚本地址
}: AnalyticsProps) => {
  return (
    <>
      <script
        async
        defer
        data-website-id={websiteId}
        src={scriptSrc}
        data-domains="your-domain.com"  // 替换为您的域名
        data-cache="true"
      />
    </>
  );
};

export default Analytics; 