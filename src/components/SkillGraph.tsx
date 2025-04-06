import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';

// 定义技能数据类型
interface SkillNode {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
}

interface SkillLink {
  source: string;
  target: string;
  strength: number; // 1-3
}

interface SkillGraphData {
  nodes: SkillNode[];
  links: SkillLink[];
}

// 简单的彩色画布渲染，避免使用重型库
const SkillGraph = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>(0);

  // 获取数据
  const skillsData: SkillGraphData = {
    nodes: [
      { id: 'javascript', name: 'JavaScript', level: 5, category: 'frontend' },
      { id: 'typescript', name: 'TypeScript', level: 5, category: 'frontend' },
      { id: 'react', name: 'React', level: 5, category: 'frontend' },
      { id: 'nodejs', name: 'Node.js', level: 4, category: 'backend' },
      { id: 'express', name: 'Express', level: 4, category: 'backend' },
      { id: 'mongodb', name: 'MongoDB', level: 3, category: 'database' },
      { id: 'sql', name: 'SQL', level: 4, category: 'database' },
      { id: 'html', name: 'HTML', level: 5, category: 'frontend' },
      { id: 'css', name: 'CSS', level: 5, category: 'frontend' },
      { id: 'tailwind', name: 'Tailwind', level: 4, category: 'frontend' },
      { id: 'git', name: 'Git', level: 4, category: 'devops' },
      { id: 'docker', name: 'Docker', level: 3, category: 'devops' },
    ],
    links: [
      { source: 'javascript', target: 'typescript', strength: 3 },
      { source: 'typescript', target: 'react', strength: 3 },
      { source: 'react', target: 'javascript', strength: 3 },
      { source: 'javascript', target: 'nodejs', strength: 2 },
      { source: 'nodejs', target: 'express', strength: 3 },
      { source: 'express', target: 'mongodb', strength: 2 },
      { source: 'nodejs', target: 'mongodb', strength: 2 },
      { source: 'html', target: 'css', strength: 3 },
      { source: 'css', target: 'tailwind', strength: 2 },
      { source: 'html', target: 'javascript', strength: 2 },
      { source: 'javascript', target: 'css', strength: 2 },
      { source: 'git', target: 'docker', strength: 1 },
      { source: 'react', target: 'html', strength: 2 },
    ]
  };

  // 初始化节点位置
  const initializeNodes = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    
    // 分配初始位置
    skillsData.nodes.forEach((node, i) => {
      const angle = (i / skillsData.nodes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.35;
      
      node.x = width / 2 + radius * Math.cos(angle);
      node.y = height / 2 + radius * Math.sin(angle);
      node.vx = 0;
      node.vy = 0;
      node.radius = 20 + node.level * 4; // 节点大小随等级变化
    });
    
    setIsInitialized(true);
  };
  
  // 颜色映射函数
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      frontend: '#3b82f6', // blue
      backend: '#10b981', // emerald
      database: '#8b5cf6', // violet
      devops: '#f59e0b', // amber
      mobile: '#ef4444', // red
      other: '#6b7280'  // gray
    };
    
    return colors[category] || colors.other;
  };
  
  // 简单的力导向布局算法
  const applyForces = () => {
    if (!isInitialized) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // 施加节点间力
    skillsData.nodes.forEach(node => {
      let fx = 0;
      let fy = 0;
      
      // 处理节点与其他节点之间的斥力
      skillsData.nodes.forEach(otherNode => {
        if (node.id === otherNode.id) return;
        
        const dx = (node.x || 0) - (otherNode.x || 0);
        const dy = (node.y || 0) - (otherNode.y || 0);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return;
        
        // 简单的反比平方斥力
        const force = 500 / (distance * distance);
        fx += (dx / distance) * force;
        fy += (dy / distance) * force;
      });
      
      // 处理边缘约束力（保持节点在画布内）
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = (node.x || 0) - centerX;
      const dy = (node.y || 0) - centerY;
      const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
      
      if (distanceToCenter > 0) {
        const maxRadius = Math.min(width, height) * 0.4;
        if (distanceToCenter > maxRadius) {
          fx -= (dx / distanceToCenter) * 0.1 * (distanceToCenter - maxRadius);
          fy -= (dy / distanceToCenter) * 0.1 * (distanceToCenter - maxRadius);
        }
      }
      
      // 更新速度 (带阻尼)
      node.vx = ((node.vx || 0) + fx) * 0.6;
      node.vy = ((node.vy || 0) + fy) * 0.6;
      
      // 更新位置
      node.x = (node.x || 0) + node.vx;
      node.y = (node.y || 0) + node.vy;
    });
    
    // 施加链接力（拉力）
    skillsData.links.forEach(link => {
      const sourceNode = skillsData.nodes.find(n => n.id === link.source);
      const targetNode = skillsData.nodes.find(n => n.id === link.target);
      
      if (!sourceNode || !targetNode) return;
      
      const dx = (targetNode.x || 0) - (sourceNode.x || 0);
      const dy = (targetNode.y || 0) - (sourceNode.y || 0);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance === 0) return;
      
      // 理想距离取决于强度
      const idealDistance = 100 + (3 - link.strength) * 30;
      const force = (distance - idealDistance) * 0.05 * link.strength;
      
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      
      sourceNode.vx = (sourceNode.vx || 0) + fx;
      sourceNode.vy = (sourceNode.vy || 0) + fy;
      targetNode.vx = (targetNode.vx || 0) - fx;
      targetNode.vy = (targetNode.vy || 0) - fy;
    });
  };
  
  // 绘制图形
  const renderGraph = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制连接线
    ctx.lineWidth = 1;
    skillsData.links.forEach(link => {
      const sourceNode = skillsData.nodes.find(n => n.id === link.source);
      const targetNode = skillsData.nodes.find(n => n.id === link.target);
      
      if (!sourceNode || !targetNode) return;
      
      ctx.beginPath();
      ctx.moveTo(sourceNode.x || 0, sourceNode.y || 0);
      ctx.lineTo(targetNode.x || 0, targetNode.y || 0);
      
      // 根据连接强度设置透明度
      const alpha = 0.1 + (link.strength * 0.2);
      ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
      ctx.stroke();
    });
    
    // 绘制节点
    skillsData.nodes.forEach(node => {
      if (node.x === undefined || node.y === undefined) return;
      
      const radius = node.radius || 15;
      
      // 绘制节点圆形
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = `${getCategoryColor(node.category)}`;
      ctx.fill();
      
      // 绘制外圈
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // 绘制文字
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name, node.x, node.y);
    });
  };
  
  // 动画循环
  const animate = () => {
    applyForces();
    renderGraph();
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // 处理窗口大小变化
  const handleResize = () => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = 400; // 固定高度
    
    setDimensions({ width, height });
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    initializeNodes();
  };
  
  // 初始化
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // 当初始化完成后开始动画
  useEffect(() => {
    if (isInitialized && inView) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [isInitialized, inView]);
  
  return (
    <motion.div 
      ref={containerRef} 
      className="w-full mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 shadow-lg overflow-hidden bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/70 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
          {t('skills.skillMap')}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {t('skills.skillMapDescription')}
        </p>
        
        <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-lg overflow-hidden bg-slate-50/70 dark:bg-slate-900/50">
          <canvas 
            ref={canvasRef} 
            width={dimensions.width} 
            height={dimensions.height}
            className="w-full"
          />
        </div>
        
        {/* 分类图例 */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {['frontend', 'backend', 'database', 'devops'].map(category => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getCategoryColor(category) }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {t(`skills.category.${category}`)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default SkillGraph; 