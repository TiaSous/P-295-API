import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useBookStore } from '@/stores/bookStore';
import Accueil from '@/views/Accueil.vue';

vi.mock('@/components/ListeLivre.vue', () => ({
  default: {
    name: 'ListeLivre',
    props: ['name', 'livres'],
    template: '<div data-testid="liste-livre" :data-count="livres.length">{{ name }}</div>',
  },
}));

vi.mock('@/stores/bookStore', () => ({
  useBookStore: vi.fn(),
}));

function createMockStore(overrides = {}) {
  return {
    books: [],
    isLoading: false,
    fetchBooks: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('Accueil', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe('au montage', () => {
    it('appelle fetchBooks une seule fois', async () => {
      const mockStore = createMockStore();
      vi.mocked(useBookStore).mockReturnValue(mockStore as any);

      mount(Accueil);

      expect(mockStore.fetchBooks).toHaveBeenCalledOnce();
    });
  });

  describe('rendu', () => {
    it('affiche le titre de bienvenue', () => {
      vi.mocked(useBookStore).mockReturnValue(createMockStore() as any);

      const wrapper = mount(Accueil);

      expect(wrapper.find('h1').text()).toBe('Bienvenue !');
    });

    it('passe le bon nom à ListeLivre', () => {
      vi.mocked(useBookStore).mockReturnValue(createMockStore() as any);

      const wrapper = mount(Accueil);

      expect(wrapper.find('[data-testid="liste-livre"]').text()).toBe('Dernière Sortie');
    });

    it('passe les livres du store à ListeLivre', () => {
      const fakeBooks = [
        { id: 1, title: 'Clean Code' },
        { id: 2, title: 'Refactoring' },
      ];
      vi.mocked(useBookStore).mockReturnValue(createMockStore({ books: fakeBooks }) as any);

      const wrapper = mount(Accueil);

      const listeLivre = wrapper.find('[data-testid="liste-livre"]');
      expect(listeLivre.attributes('data-count')).toBe('2');
    });

    it('passe une liste vide à ListeLivre si le store est vide', () => {
      vi.mocked(useBookStore).mockReturnValue(createMockStore() as any);

      const wrapper = mount(Accueil);

      const listeLivre = wrapper.find('[data-testid="liste-livre"]');
      expect(listeLivre.attributes('data-count')).toBe('0');
    });
  });
});
