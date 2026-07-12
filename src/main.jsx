import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  ArrowLeft,
  Award,
  Bot,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Radio,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import BorderGlow from './components/BorderGlow';
import SplitText from './components/SplitText';

gsap.registerPlugin(ScrollTrigger);

const makeProjectPages = (slug, count) =>
  Array.from({ length: count }, (_, index) => `/project-pages/${slug}/${String(index + 1).padStart(2, '0')}.webp`);

const makeProjectPngPages = (slug, count) =>
  Array.from({ length: count }, (_, index) => `/project-pages/${slug}/${String(index + 1).padStart(2, '0')}.png`);

const makeMotionPages = (count) =>
  Array.from({ length: count }, (_, index) => `/project-pages/motion/tabbar_${String(index + 1).padStart(2, '0')}.gif`);

const projects = [
  {
    slug: 'intercom',
    coverNo: '01',
    coverCategory: 'CORE',
    coverTitle: '无网实时对讲',
    title: '华为畅连 - 7 公里无网实时对讲',
    type: 'Mate 80 / Offline Intercom UX',
    year: '2026',
    image: '/pdf-pages/page-05.jpg',
    summary:
      '在无网络环境下实现附近联系人消息与语音对讲，完成需求理解、竞品分析、主流程和 Beta 问题优化。',
    pages: makeProjectPages('intercom', 12),
    metrics: ['12 页项目详情', '7 公里覆盖', '无网实时对讲'],
  },
  {
    slug: 'beidou',
    coverNo: '02',
    coverCategory: 'CORE',
    coverTitle: '北斗卫星消息',
    title: '华为畅连 - 北斗卫星消息',
    type: 'Red Dot + iF Award / Satellite Messaging',
    year: '2022-2025',
    image: '/pdf-pages/beidou-18.jpg',
    summary:
      '全球首款支持北斗卫星消息双向通信的功能，围绕入口、编辑、寻星、发送结果与用户调研完成体验闭环。',
    pages: makeProjectPages('beidou', 16),
    metrics: ['16 页项目详情', '红点奖 + iF 奖', 'Mate 50 系列'],
  },
  {
    slug: 'tiantong',
    coverNo: '03',
    coverCategory: 'SYSTEM',
    coverTitle: '天通卫星通信',
    title: '华为 - 天通卫星通信',
    type: 'Red Dot Award / Satellite Call & SMS',
    year: '2023-2025',
    image: '/pdf-pages/tiantong-34.jpg',
    summary:
      '首创支持天通卫星通信的手机双向通信体验，覆盖开通、寻星、接打电话、短信和多端适配。',
    pages: makeProjectPages('tiantong', 8),
    metrics: ['8 页项目详情', '红点奖', '卫星电话 + 短信'],
  },
  {
    slug: 'drag',
    coverNo: '04',
    coverCategory: 'SYSTEM',
    coverTitle: '系统拖拽能力',
    title: '畅连消息适配系统拖拽能力',
    type: 'HarmonyOS / Cross-app Drag & Drop',
    year: '2022',
    image: '/pdf-pages/drag-43.jpg',
    summary:
      '围绕超级中转站能力，梳理消息类型、规格限制、拖入拖出流程与异常状态，提升跨应用内容流转效率。',
    pages: makeProjectPages('drag', 5),
    metrics: ['5 页项目详情', 'HarmonyOS', '跨应用拖拽'],
  },
  {
    slug: 'ai-interaction',
    coverNo: '05',
    coverCategory: 'AIGC',
    coverTitle: 'AI-Native B端设计工作流实践',
    title: 'AI-Native B端设计工作流实践',
    type: 'AI Assisted Interaction Design',
    year: '2026',
    image: '/project-pages/ai-interaction/01.png',
    summary:
      '以飞书设计系统解析与审批模块体验优化为例，探索 AI-Native B 端设计工作流，覆盖业务理解、Token 提取、组件归纳、布局重建和体验优化。',
    pages: makeProjectPngPages('ai-interaction', 10),
    metrics: ['10 页项目详情', '效率提升 50%', 'AI-Native 工作流'],
  },
  {
    slug: 'ai-brand',
    coverNo: '06',
    coverCategory: 'AIGC',
    coverTitle: 'AI辅助品牌设计',
    title: 'AI 辅助品牌设计',
    type: 'AI Assisted Brand Design',
    year: '2026',
    image: '/project-pages/ai-brand/01.jpg',
    summary:
      '围绕品牌视觉方向、关键画面、风格探索和设计资产生成，提升品牌概念提案与视觉延展效率。',
    pages: ['/project-pages/ai-brand/01.jpg'],
    metrics: ['AI IP 设计', 'AIGC 探索', '品牌视觉延展'],
  },
  {
    slug: 'motion-showcase',
    coverNo: '07',
    coverCategory: 'MOTION',
    coverTitle: '动效展示',
    title: 'Tabbar 交互动效设计',
    type: 'Motion Design / Tabbar Interaction',
    year: '2026',
    image: '/project-pages/motion/tabbar_01.gif',
    summary:
      '围绕移动端 Tabbar 的状态切换与图标反馈，探索 21 组不同视觉风格和运动节奏的交互动效方案。',
    pages: makeMotionPages(21),
    metrics: ['21 组动效', 'Tabbar Design', '交互反馈探索'],
    gallery: true,
  },
];

const strengths = [
  {
    icon: <Radio size={28} />,
    title: '复杂通信业务 0-1 落地',
    text: '长期负责电话、短信、畅连消息、卫星通信等复杂业务，能从产品规格、交互框架到开发交付闭环推进。',
  },
  {
    icon: <Award size={28} />,
    title: '旗舰项目与奖项经验',
    text: '参与 Mate 50、Mate 60 Pro、Mate 80 等发布会核心亮点功能，项目获得红点奖、iF 奖等认可。',
  },
  {
    icon: <Layers3 size={28} />,
    title: '用户研究与体验优化',
    text: '能组织问卷、用户访谈、问题分级、方案对比和 Beta 反馈收敛，把用户痛点转化为可执行方案。',
  },
  {
    icon: <Bot size={28} />,
    title: 'AI 辅助设计与高效输出',
    text: '熟练运用 AI 工具辅助设计探索、资料整理和方案表达，同时兼顾交互、视觉、动效与多端适配交付。',
  },
];

const stats = [
  ['8 年', '互联网设计经验'],
  ['10+', '项目经验'],
  ['1w+', '页面设计'],
  ['3 次', '旗舰发布会亮点'],
];

const workHistory = [
  {
    company: '华为通信业务：畅连 + 通话 + 信息',
    period: '2021.03 - 2026.04',
    detail:
      '负责畅连消息迭代优化，北斗卫星消息、天通卫星通信、无网通信对讲等项目从 0-1 落地与迭代。',
  },
  {
    company: '前海乐腾网络科技有限公司',
    period: '2018.11 - 2021.01',
    detail:
      '负责快活直播项目迭代与设计规范制定，参与产品调研、用户分析、交互原型、App 界面和运营活动设计。',
  },
  {
    company: '西安市巨网科技有限公司',
    period: '2017.10 - 2018.10',
    detail:
      '参与乐实习学生端界面视觉设计、原型绘制、Icon 绘制、切图标注与上线跟踪。',
  },
];

function App() {
  const appRef = useRef(null);
  const projectDragRef = useRef({
    active: false,
    captured: false,
    startX: 0,
    scrollLeft: 0,
    wasDragging: false,
    target: null,
  });
  const [isNavFloating, setIsNavFloating] = useState(false);
  const [activeProjectSlug, setActiveProjectSlug] = useState('');
  const activeProject = projects.find((project) => project.slug === activeProjectSlug);

  useEffect(() => {
    let frameId = 0;

    const updateNavState = () => {
      setIsNavFloating(window.scrollY > 0);
    };

    const requestNavUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateNavState);
    };

    updateNavState();
    window.addEventListener('scroll', requestNavUpdate, { passive: true });
    window.addEventListener('resize', requestNavUpdate);
    document.addEventListener('scroll', requestNavUpdate, { passive: true });
    const fallbackTimer = window.setInterval(updateNavState, 120);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearInterval(fallbackTimer);
      window.removeEventListener('scroll', requestNavUpdate);
      window.removeEventListener('resize', requestNavUpdate);
      document.removeEventListener('scroll', requestNavUpdate);
    };
  }, []);

  useLayoutEffect(() => {
    if (activeProjectSlug) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('[data-animate], .openingLayer', { clearProps: 'all' });
        return;
      }

      gsap.set('.nav', { xPercent: -50, y: -88, opacity: 0 });
      gsap.set('.openingLayer', { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set('.heroEther', { scale: 1.12, filter: 'blur(14px) brightness(0.55)' });
      gsap.set('.heroTitleLine', { yPercent: 116, scaleY: 0.72, opacity: 0 });
      gsap.set('.heroContent .eyebrow, .heroMeta span', { y: 28, opacity: 0 });

      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } });

      opening
        .to('.openingLayer', {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.35,
          ease: 'expo.inOut',
        })
        .to(
          '.heroEther',
          {
            scale: 1,
            filter: 'blur(0px) brightness(0.9)',
            duration: 1.65,
            ease: 'expo.out',
          },
          0.15,
        )
        .to(
          '.nav',
          {
            xPercent: -50,
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'expo.out',
          },
          0.28,
        )
        .to(
          '.heroContent .eyebrow',
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
          },
          0.55,
        )
        .to(
          '.heroTitleLine',
          {
            yPercent: 0,
            scaleY: 1,
            opacity: 1,
            duration: 1.25,
          },
          0.78,
        )
        .to(
          '.heroMeta span',
          {
            y: 0,
            opacity: 1,
            duration: 0.78,
            stagger: 0.12,
          },
          1.2,
        )
        .set('.nav', { clearProps: 'transform,opacity' });

      gsap.utils.toArray('.section').forEach((section) => {
        const title = section.querySelector('.sectionHeader h2, .profileTitleBlock h2, .finalInner h2:not(.split-parent)');
        const eyebrow = section.querySelector('.sectionHeader .eyebrow, .finalInner .eyebrow');
        const cards = section.querySelectorAll('.projectCard, .strengthGlow, .workItem, .profileInfoGrid div, .profileStats .stat, .profileBuilding em, .bigMail');

        if (title) {
          const titleAnimation = gsap.from(title, {
            x: -120,
            y: 46,
            scaleX: 0.82,
            opacity: 0,
            transformOrigin: 'left center',
            duration: 1.18,
            ease: 'expo.out',
            paused: true,
          });

          ScrollTrigger.create({
            trigger: section,
            start: 'top 78%',
            once: true,
            onEnter: () => titleAnimation.play(),
            onRefresh: (self) => {
              if (self.progress > 0 && titleAnimation.progress() === 0) titleAnimation.play();
            },
          });
        }

        if (eyebrow) {
          const eyebrowAnimation = gsap.from(eyebrow, {
            y: 26,
            opacity: 0,
            duration: 0.82,
            ease: 'power3.out',
            paused: true,
          });

          ScrollTrigger.create({
            trigger: section,
            start: 'top 82%',
            once: true,
            onEnter: () => eyebrowAnimation.play(),
            onRefresh: (self) => {
              if (self.progress > 0 && eyebrowAnimation.progress() === 0) eyebrowAnimation.play();
            },
          });
        }

        if (cards.length) {
          const cardsAnimation = gsap.fromTo(
            cards,
            {
              y: 72,
              opacity: 0,
              scale: 0.96,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'expo.out',
              clearProps: 'transform,opacity,translate,scale,rotate',
              stagger: {
                each: 0.09,
                from: 'start',
              },
              paused: true,
            },
          );

          ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            once: true,
            onEnter: () => cardsAnimation.play(),
            onRefresh: (self) => {
              if (self.progress > 0 && cardsAnimation.progress() === 0) cardsAnimation.play();
            },
          });
        }
      });

      gsap.from('.profileVisual', {
        scrollTrigger: {
          trigger: '.profileVisual',
          start: 'top 82%',
          once: true,
        },
        clipPath: 'inset(0 0 100% 0 round 28px)',
        y: 70,
        duration: 1.25,
        ease: 'expo.out',
      });

      ScrollTrigger.matchMedia({
        '(min-width: 1023px)': () => {
          gsap.from('.profileVisual img', {
            scrollTrigger: {
              trigger: '.profileVisual',
              start: 'top 82%',
              scrub: 0.9,
            },
            yPercent: -7,
            scale: 1.08,
            ease: 'none',
          });
        },
      });

      gsap.from('.projectCoverArt', {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 72%',
          once: true,
        },
        y: 56,
        rotate: -8,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
      });

      gsap.to('.heroEther', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
      });

      gsap.to('.finalInner svg', {
        scrollTrigger: {
          trigger: '.finalContact',
          start: 'top 72%',
          once: true,
        },
        rotate: 135,
        scale: 1.22,
        duration: 1.35,
        ease: 'expo.out',
      });

      const refreshMotion = () => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      };

      gsap.delayedCall(0.2, refreshMotion);
      gsap.delayedCall(1.8, refreshMotion);
    }, appRef);

    return () => ctx.revert();
  }, [activeProjectSlug]);

  useEffect(() => {
    const syncProjectFromHash = () => {
      const slug = window.location.hash.replace('#project-', '');
      setActiveProjectSlug(projects.some((project) => project.slug === slug) ? slug : '');
    };

    syncProjectFromHash();
    window.addEventListener('popstate', syncProjectFromHash);
    window.addEventListener('hashchange', syncProjectFromHash);

    return () => {
      window.removeEventListener('popstate', syncProjectFromHash);
      window.removeEventListener('hashchange', syncProjectFromHash);
    };
  }, []);

  const openProject = (slug) => {
    setActiveProjectSlug(slug);
    window.history.pushState(null, '', `#project-${slug}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openProjectFromCard = (slug) => {
    if (projectDragRef.current.wasDragging) return;
    openProject(slug);
  };

  const handleProjectPointerDown = (event) => {
    if (event.button !== 0) return;

    const target = event.currentTarget;
    projectDragRef.current = {
      active: true,
      captured: false,
      startX: event.clientX,
      scrollLeft: target.scrollLeft,
      wasDragging: false,
      target,
    };
  };

  const handleProjectPointerMove = (event) => {
    const dragState = projectDragRef.current;
    if (!dragState.active || dragState.target !== event.currentTarget) return;

    const deltaX = event.clientX - dragState.startX;
    if (Math.abs(deltaX) > 4) {
      dragState.wasDragging = true;
      if (!dragState.captured) {
        dragState.captured = true;
        event.currentTarget.classList.add('isDragging');
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }
      event.preventDefault();
    }

    event.currentTarget.scrollLeft = dragState.scrollLeft - deltaX;
  };

  const handleProjectPointerEnd = (event) => {
    const dragState = projectDragRef.current;
    if (!dragState.active || dragState.target !== event.currentTarget) return;

    event.currentTarget.classList.remove('isDragging');
    if (dragState.captured && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    projectDragRef.current = {
      ...dragState,
      active: false,
      captured: false,
      target: null,
    };

    if (dragState.wasDragging) {
      window.setTimeout(() => {
        projectDragRef.current.wasDragging = false;
      }, 160);
    }
  };

  const closeProject = () => {
    setActiveProjectSlug('');
    window.history.pushState(null, '', '#projects');
    window.requestAnimationFrame(() => {
      document.querySelector('#projects')?.scrollIntoView();
    });
  };

  if (activeProject) {
    return <ProjectDetail project={activeProject} onBack={closeProject} />;
  }

  return (
    <main ref={appRef}>
      <div className="openingLayer" aria-hidden="true">
        <span />
      </div>
      <nav className={`nav ${isNavFloating ? 'navFloating' : ''}`}>
        <a className="brand" href="#home">
          Yang Yuehang
        </a>
        <div className="navLinks" aria-label="Primary navigation">
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#strengths">优势</a>
        </div>
        <a className="contactButton" href="tel:13992556203">
          <Phone size={18} />
          联系我
        </a>
      </nav>
      <section className="hero" id="home">
        <div className="heroEther" aria-hidden="true">
          <video className="heroVideo" autoPlay muted loop playsInline preload="auto">
            <source src="/hero/hero-background.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">UX / UE Designer · Visual Designer · AI Designer</p>
          <h1 className="heroTitleMask">
            <span className="heroTitleLine">
              <span className="heroTitleDesign">DESIGN</span>
              <span className="heroTitlePortfolio">
                P<span className="heroAccentLetter">O</span>RTFOLIO
              </span>
            </span>
          </h1>
          <div className="heroMeta">
            <span>8 年互联网设计经验</span>
            <span>华为通信业务</span>
            <span>红点奖 + iF 奖项目</span>
          </div>
        </div>
      </section>

      <section className="section experience" id="experience">
        <div className="sectionInner profileSection">
          <div className="profileTitleBlock">
            <h2>
              Work Experience
              <ArrowUpRight size={34} />
            </h2>
            <p>个人经历</p>
          </div>

          <div className="profileLayout">
            <div className="profileVisual" aria-hidden="true">
              <div className="profileBadge">8 years / UX·UE·AI Design</div>
              <img src="/profile/avatar.jpg" alt="" />
            </div>

            <div className="profileCopy">
              <div className="profileIntro">
                <p className="eyebrow">About Me</p>
                <h2>Hi, I am YangYuehang!</h2>
                <p>
                  我把复杂通信业务、用户研究和交互设计整合成可落地的产品体验。擅长从需求理解、
                  产品规格、用户调研到交互原型和视觉落地推进项目，让高复杂度功能更清晰、更可用。
                </p>
              </div>

              <div className="profileInfoGrid">
                <div>
                  <span>当前身份</span>
                  <strong>UX / UE Designer</strong>
                </div>
                <div>
                  <span>服务方向</span>
                  <strong>Communication / AIGC</strong>
                </div>
                <div>
                  <span>手机</span>
                  <strong>13992556203</strong>
                </div>
                <div>
                  <span>城市</span>
                  <strong>深圳</strong>
                </div>
              </div>

              <div className="stats profileStats">
                {stats.map(([value, label]) => (
                  <div className="stat" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="profileBuilding">
                <span>Now Building</span>
                <div>
                  <em>北斗卫星消息</em>
                  <em>无网实时对讲</em>
                  <em>天通卫星通信</em>
                  <em>系统拖拽能力</em>
                </div>
              </div>
            </div>
          </div>

          <div className="workList">
            {workHistory.map((item) => (
              <article className="workItem" key={item.company}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="eyebrow">Selected Works</p>
            <h2>精选项目</h2>
          </div>
          <div
            className="projectCarousel projectCarouselDesktop"
            aria-label="精选项目循环展示"
            onPointerDown={handleProjectPointerDown}
            onPointerMove={handleProjectPointerMove}
            onPointerUp={handleProjectPointerEnd}
            onPointerCancel={handleProjectPointerEnd}
            onPointerLeave={handleProjectPointerEnd}
          >
            <div className="projectGrid">
              {[0, 1].map((groupIndex) => (
                <div className="projectLoopGroup" key={groupIndex}>
                  {projects.map((project) => (
                    <button
                      className={`projectCard project-${project.slug}`}
                      key={`${groupIndex}-${project.slug}`}
                      type="button"
                      tabIndex={groupIndex === 0 ? 0 : -1}
                      onPointerUp={() => openProjectFromCard(project.slug)}
                      onClick={() => openProjectFromCard(project.slug)}
                      aria-label={`查看${project.title}项目详情`}
                    >
                      <BorderGlow
                        className="projectGlow"
                        edgeSensitivity={20}
                        glowColor="80 100 62"
                        backgroundColor="transparent"
                        borderRadius={22}
                        glowRadius={26}
                        glowIntensity={0.9}
                        coneSpread={22}
                        colors={['#c9ff37', '#6a50ff', '#9fd2c7']}
                        fillOpacity={0.28}
                      >
                        <div className="projectCoverTop">
                          <span className="projectIndex">{project.coverNo}</span>
                          <span className="projectCategory">{project.coverCategory}</span>
                        </div>
                        <div className="projectCoverTitle">
                          <h3>
                            {project.coverTitle}
                            <span className="titleDot" />
                          </h3>
                          <p>{project.summary}</p>
                        </div>
                        <div className="projectCoverArt" aria-hidden="true">
                          <span className="artShape artShapeOne" />
                          <span className="artShape artShapeTwo" />
                          <span className="artShape artShapeThree" />
                          <span className="artSpark" />
                        </div>
                        <div className="projectCoverFooter">
                          <span>{project.year}</span>
                          <ArrowUpRight size={22} />
                        </div>
                      </BorderGlow>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="projectCarouselMobile" aria-label="精选项目双行循环展示">
            {[projects.slice(0, 3), projects.slice(3)].map((rowProjects, rowIndex) => (
              <div
                className={`projectCarousel projectCarouselRow ${rowIndex === 1 ? 'projectCarouselRowReverse' : ''}`}
                key={rowIndex}
                onPointerDown={handleProjectPointerDown}
                onPointerMove={handleProjectPointerMove}
                onPointerUp={handleProjectPointerEnd}
                onPointerCancel={handleProjectPointerEnd}
                onPointerLeave={handleProjectPointerEnd}
              >
                <div className="projectGrid">
                  {[0, 1].map((groupIndex) => (
                    <div className="projectLoopGroup" key={groupIndex}>
                      {rowProjects.map((project) => (
                        <button
                          className={`projectCard project-${project.slug}`}
                          key={`${rowIndex}-${groupIndex}-${project.slug}`}
                          type="button"
                          tabIndex={groupIndex === 0 ? 0 : -1}
                          onPointerUp={() => openProjectFromCard(project.slug)}
                          onClick={() => openProjectFromCard(project.slug)}
                          aria-label={`查看${project.title}项目详情`}
                        >
                          <BorderGlow
                            className="projectGlow"
                            edgeSensitivity={20}
                            glowColor="80 100 62"
                            backgroundColor="transparent"
                            borderRadius={22}
                            glowRadius={26}
                            glowIntensity={0.9}
                            coneSpread={22}
                            colors={['#c9ff37', '#6a50ff', '#9fd2c7']}
                            fillOpacity={0.28}
                          >
                            <div className="projectCoverTop">
                              <span className="projectIndex">{project.coverNo}</span>
                              <span className="projectCategory">{project.coverCategory}</span>
                            </div>
                            <div className="projectCoverTitle">
                              <h3>
                                {project.coverTitle}
                                <span className="titleDot" />
                              </h3>
                              <p>{project.summary}</p>
                            </div>
                            <div className="projectCoverArt" aria-hidden="true">
                              <span className="artShape artShapeOne" />
                              <span className="artShape artShapeTwo" />
                              <span className="artShape artShapeThree" />
                              <span className="artSpark" />
                            </div>
                            <div className="projectCoverFooter">
                              <span>{project.year}</span>
                              <ArrowUpRight size={22} />
                            </div>
                          </BorderGlow>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths" id="strengths">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="eyebrow">Capabilities</p>
            <h2>个人优势</h2>
          </div>
          <div className="strengthGrid">
            {strengths.map((item) => (
              <BorderGlow
                className="strengthGlow"
                key={item.title}
                edgeSensitivity={24}
                glowColor="170 55 76"
                backgroundColor="transparent"
                borderRadius={22}
                glowRadius={22}
                glowIntensity={0.75}
                coneSpread={24}
                colors={['#9fd2c7', '#c9ff37', '#6a50ff']}
                fillOpacity={0.18}
              >
                <article className="strengthCard">
                  <div className="strengthIcon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="finalContact" id="contact">
        <div className="finalInner">
          <div className="finalIcon" aria-hidden="true">
            <Sparkles size={34} />
          </div>
          <p className="eyebrow">Contact</p>
          <SplitText
            tag="h2"
            text="期待与您一起推进稳定可落地的产品体验"
            className="finalSplitTitle"
            splitType="chars"
            delay={45}
            duration={1.1}
            ease="expo.out"
            from={{ opacity: 0, y: 64, rotateX: -42, filter: 'blur(10px)' }}
            to={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            threshold={0.18}
            rootMargin="-80px"
            textAlign="center"
          />
          <div className="contactActions">
            <a className="bigMail" href="tel:13992556203">
              <Phone size={24} />
              13992556203
              <ArrowUpRight size={28} />
            </a>
            <a className="bigMail" href="mailto:925397016@qq.com">
              <Mail size={24} />
              925397016@qq.com
              <ArrowUpRight size={28} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const designTokenTabs = [
  {
    id: 'color',
    label: '色彩',
    imageSrc: '/project-pages/ai-interaction/token-tabs/color.png',
    title: 'Color Token / 色彩变量',
    description: '从品牌色、功能色到中性色，提取可复用的语义变量，降低多人协作中的颜色偏差。',
    chips: ['Brand', 'Neutral', 'Success', 'Warning', 'Danger'],
    blocks: [
      { name: 'Primary / 500', value: '#3B82F6', note: '主操作、链接、高亮状态' },
      { name: 'Purple / 500', value: '#8B5CF6', note: 'AI 标签、流程强调' },
      { name: 'Success / 500', value: '#22C55E', note: '通过、完成、正向反馈' },
      { name: 'Warning / 500', value: '#F97316', note: '风险提示、重点提醒' },
      { name: 'Neutral / 900', value: '#1E293B', note: '正文标题、主要文字' },
      { name: 'Neutral / 100', value: '#F1F5F9', note: '页面底色、容器衬底' },
    ],
  },
  {
    id: 'type',
    label: '字体',
    imageSrc: '/project-pages/ai-interaction/token-tabs/typography.png',
    title: 'Typography Token / 字体层级',
    description: '把页面标题、模块标题、正文和辅助信息拆成统一层级，保证 B 端复杂页面阅读节奏稳定。',
    chips: ['Display', 'Heading', 'Body', 'Caption'],
    blocks: [
      { name: 'Display / Bold', value: '40 / 48', note: '页面主标题，承载核心信息' },
      { name: 'Heading / Semibold', value: '28 / 36', note: '模块标题，建立内容分区' },
      { name: 'Body / Regular', value: '18 / 30', note: '业务说明与长文本阅读' },
      { name: 'Caption / Medium', value: '14 / 22', note: '标签、注释、弱提示信息' },
    ],
  },
  {
    id: 'spacing',
    label: '间距',
    imageSrc: '/project-pages/ai-interaction/token-tabs/spacing.png',
    title: 'Spacing Token / 间距体系',
    description: '以 4px 栅格为基础，把页面留白、卡片内边距、表单间距和模块间距统一成可维护规则。',
    chips: ['4px Grid', '8', '12', '16', '24', '32', '48'],
    blocks: [
      { name: 'Space / 8', value: '8px', note: '图标与文本、紧密信息组合' },
      { name: 'Space / 16', value: '16px', note: '表单项、按钮组、轻量区块' },
      { name: 'Space / 24', value: '24px', note: '卡片内边距、列表信息间距' },
      { name: 'Space / 40', value: '40px', note: '模块内容与标题之间的距离' },
      { name: 'Space / 64', value: '64px', note: '大模块之间的节奏分隔' },
    ],
  },
  {
    id: 'radius',
    label: '圆角',
    imageSrc: '/project-pages/ai-interaction/token-tabs/radius.png',
    title: 'Radius Token / 圆角规范',
    description: '根据按钮、输入框、卡片和弹窗的层级关系定义圆角，避免同一系统内出现风格漂移。',
    chips: ['4', '8', '12', '16', '24', '999'],
    blocks: [
      { name: 'Radius / 6', value: '6px', note: '输入框、表格标签、轻量按钮' },
      { name: 'Radius / 12', value: '12px', note: '信息卡片、列表容器' },
      { name: 'Radius / 20', value: '20px', note: '重点模块、弹窗内容区' },
      { name: 'Radius / Full', value: '999px', note: '胶囊标签、状态按钮' },
    ],
  },
  {
    id: 'shadow',
    label: '阴影',
    imageSrc: '/project-pages/ai-interaction/token-tabs/shadow.png',
    title: 'Shadow Token / 阴影层级',
    description: '将悬浮、弹层、卡片和导航的阴影进行分层，控制界面深度同时避免视觉噪音。',
    chips: ['Soft', 'Card', 'Popover', 'Dialog'],
    blocks: [
      { name: 'Shadow / Soft', value: '0 8 24', note: '轻量卡片和 hover 状态' },
      { name: 'Shadow / Card', value: '0 16 48', note: '核心内容容器、独立模块' },
      { name: 'Shadow / Popover', value: '0 24 72', note: '下拉菜单、浮层内容' },
      { name: 'Shadow / Dialog', value: '0 32 96', note: '弹窗和最高层级反馈' },
    ],
  },
];

function DesignTokenInteractivePage({ caption }) {
  const [activeTab, setActiveTab] = useState(designTokenTabs[0].id);
  const active = designTokenTabs.find((tab) => tab.id === activeTab) || designTokenTabs[0];

  return (
    <figure className="detailPageFrame tokenInteractiveFrame">
      <article className="tokenHtmlPage">
        <header className="tokenPageHeader">
          <span className="tokenStepBadge">2</span>
          <h2>流程二：AI提效视觉语言搭建-Design Token挖掘</h2>
          <strong>提取视觉语言变量</strong>
        </header>

        <section className="tokenWhiteCard">
          <div className="tokenSectionTitle">
            <h3>1.沟通步骤成果页面展示</h3>
            <span>AI产出</span>
          </div>
          <div className="tokenEvidenceGrid">
            <div className="tokenEvidenceBoard">
              <img src="/assets/ai-flow-frame-7.png" alt="沟通流程与结果示意图" />
              <div className="tokenEvidenceOverlay">沟通流程与结果示意图</div>
            </div>
            <div className="tokenPromptCard">
              <h4>指令参考</h4>
              <p>1. 主界面截图</p>
              <p>2. 所需设计体系内容自然语言描述</p>
              <p>3. 将设计 Token 导入 Codex 联动 Figma</p>
              <h4>产出内容</h4>
              <p>1. 色纸体系、字号阶梯、圆角参数等设计变量 Token</p>
              <p>2. 自动产出变量 ASCⅡ 文档</p>
            </div>
          </div>

          <div className="tokenSectionTitle tokenSecondTitle">
            <h3>2.挖掘设计Token：整个审批模块</h3>
            <span>我产出</span>
          </div>

          <div className="tokenTabs" role="tablist" aria-label="设计 Token 类型">
            {designTokenTabs.map((tab) => (
              <button
                className={tab.id === active.id ? 'isActive' : ''}
                type="button"
                role="tab"
                aria-selected={tab.id === active.id}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tokenPanel" role="tabpanel">
            <img
              className="tokenPanelImage"
              key={active.imageSrc}
              src={active.imageSrc}
              alt={`流程二 ${active.label} Token 展示`}
              loading="lazy"
            />
          </div>

          <div className="tokenWorkflow">
            <h3>3.操作流程-工作流对比</h3>
            <div className="tokenWorkflowRows">
              <div>
                <strong>传统工作流：</strong>
                <span>逐屏取色、手动测量字号/间距/阴影</span>
                <i />
                <span>归纳组件规范</span>
                <i />
                <span>设计规范文档</span>
              </div>
              <div>
                <strong>AI工作流：</strong>
                <span>AI 一键解析</span>
                <i />
                <span>自动输出色值体系、字号阶梯、圆角档位</span>
                <i />
                <span>人工筛选校准</span>
              </div>
            </div>
          </div>

          <div className="tokenSectionTitle">
            <h3>4.效率提升对比</h3>
          </div>
          <div className="tokenMetrics">
            {[
              ['~30min', 'AI 生成时间', '快速产出 Token 框架'],
              ['~4h', '人工审阅调整时间', '查缺补漏'],
              ['~2days', '纯人工耗时', '传统设计方式'],
              ['~71.875%', '节省时间', '效率显著提升'],
            ].map(([value, label, note]) => (
              <article key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
                <p>{note}</p>
              </article>
            ))}
          </div>

          <div className="tokenProsCons">
            <article>
              <h4>优</h4>
              <p>快速解析全套设计 Token，生成颜色、字体等变量的参数详情。</p>
            </article>
            <article>
              <h4>劣</h4>
              <p>无归纳，仅展示参数，并不能按照想要展示的视觉效果排布，需要人工校准。</p>
            </article>
          </div>
        </section>
      </article>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ProjectDetail({ project, onBack }) {
  return (
    <main className="projectDetailPage">
      <header className="detailNav">
        <button className="backButton" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
          返回精选项目
        </button>
        <a className="contactButton detailContact" href="tel:13992556203">
          <Phone size={18} />
          联系我
        </a>
      </header>

      <section className="detailHero">
        <div className="detailHeroCopy">
          <p className="eyebrow">{project.type}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="detailMeta">
            <span>{project.year}</span>
            {project.metrics.map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`detailPages ${project.gallery ? 'motionGallery' : ''}`}
        aria-label={`${project.title} 项目详情页面`}
      >
        {project.pages.map((page, index) =>
          project.slug === 'ai-interaction' && index === 4 ? (
            <DesignTokenInteractivePage key="ai-interaction-token-page" caption={String(index + 1).padStart(2, '0')} />
          ) : (
            <figure className="detailPageFrame" key={page}>
              <img src={page} alt={`${project.title} 第 ${index + 1} 页`} loading={index < 2 ? 'eager' : 'lazy'} />
              <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          )
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
