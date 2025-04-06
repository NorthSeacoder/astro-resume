interface AnalyticsProps {
  websiteId: string;
  scriptSrc?: string;
}

const Analytics = ({ 
  websiteId,
  scriptSrc = 'https://umami.mengpeng.tech/script.js'  // umami 默认脚本地址
}: AnalyticsProps) => {
  return (
    <>
      <script
        async
        defer
        data-website-id={websiteId}
        src={scriptSrc}
        data-cache="true"
      />
    </>
  );
};

export default Analytics; 