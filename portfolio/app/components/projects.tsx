import React from 'react';
import SectionHeading from '@/app/components/section-heading';
import { projectsData } from '@/app/lib/data';
import Project from '@/app/components/project';
import { useSectionInView } from '@/app/lib/hooks';

export default function Projects() {
  const { ref } = useSectionInView('Projects', 0.5);

  return (
    <section
      ref={ref}
      id='projects'
      className='scroll-mt-28 mb-28'
    >
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
