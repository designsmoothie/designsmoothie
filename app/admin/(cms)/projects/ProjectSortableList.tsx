"use client";

import {
  useState,
  useTransition,
} from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  updateProjectOrder,
} from "./actions";
import SortableProjectRow, {
  type AdminProject,
} from "./SortableProjectRow";

type ProjectSortableListProps = {
  initialProjects: AdminProject[];
};

export default function ProjectSortableList({
  initialProjects,
}: ProjectSortableListProps) {
  const [projects, setProjects] =
    useState(initialProjects);

  const [isPending, startTransition] =
    useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter:
        sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(
    event: DragEndEvent,
  ) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = projects.findIndex(
      (project) => project.id === active.id,
    );

    const newIndex = projects.findIndex(
      (project) => project.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedProjects = arrayMove(
      projects,
      oldIndex,
      newIndex,
    ).map((project, index) => ({
      ...project,
      display_order: index,
    }));

    setProjects(reorderedProjects);

    startTransition(async () => {
      try {
        await updateProjectOrder(
          reorderedProjects.map(
            (project, index) => ({
              id: project.id,
              display_order: index,
            }),
          ),
        );
      } catch (error) {
        console.error(
          "프로젝트 순서 저장 실패:",
          error,
        );

        setProjects(projects);

        window.alert(
          "프로젝트 순서를 저장하지 못했습니다.",
        );
      }
    });
  }

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
        <p className="text-sm text-neutral-500">
          왼쪽 손잡이를 끌어 순서를 변경하세요.
        </p>

        <span className="text-xs font-medium text-neutral-400">
          {isPending
            ? "순서 저장 중..."
            : `${projects.length}개 프로젝트`}
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map(
            (project) => project.id,
          )}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-black/5">
            {projects.map((project) => (
              <SortableProjectRow
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}