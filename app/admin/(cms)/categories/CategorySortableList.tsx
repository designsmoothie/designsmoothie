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
  updateCategoryOrder,
} from "./actions";
import SortableCategoryRow, {
  type AdminCategory,
} from "./SortableCategoryRow";

type CategorySortableListProps = {
  initialCategories: AdminCategory[];
};

export default function CategorySortableList({
  initialCategories,
}: CategorySortableListProps) {
  const [categories, setCategories] =
    useState(initialCategories);

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

    const oldIndex = categories.findIndex(
      (category) =>
        category.id === active.id,
    );

    const newIndex = categories.findIndex(
      (category) =>
        category.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previousCategories = categories;

    const reorderedCategories = arrayMove(
      categories,
      oldIndex,
      newIndex,
    ).map((category, index) => ({
      ...category,
      display_order: index + 1,
    }));

    setCategories(reorderedCategories);

    startTransition(async () => {
      try {
        await updateCategoryOrder(
          reorderedCategories.map(
            (category, index) => ({
              id: category.id,
              display_order: index + 1,
            }),
          ),
        );
      } catch (error) {
        console.error(
          "카테고리 순서 저장 실패:",
          error,
        );

        setCategories(previousCategories);

        window.alert(
          "카테고리 순서를 저장하지 못했습니다.",
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
            : `${categories.length}개 카테고리`}
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map(
            (category) => category.id,
          )}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-black/5">
            {categories.map((category) => (
              <SortableCategoryRow
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}