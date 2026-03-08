import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppUploader from "@/components/ui/upload/app-uploader";
import { useUploadThing } from "@/lib/utils/uploadthing";

vi.mock("@/components/ui/file/app-file-input", () => ({
    default: (props: { onSelect: (files: File[]) => void }) => (
        <button onClick={() => props.onSelect([new File(["x"], "test.png")])}>
            MockFileInput
        </button>
    ),
}));

vi.mock("@/lib/utils/uploadthing", () => ({
    useUploadThing: vi.fn(),
}));

const mockedUseUploadThing = vi.mocked(useUploadThing);

describe("AppUploader", () => {
    const mockOnUpload = vi.fn();
    const mockStartUpload = vi.fn();

    beforeEach(() => {
        mockOnUpload.mockReset();
        mockStartUpload.mockReset();

        mockedUseUploadThing.mockImplementation((_route, config = {}) => ({
            startUpload: (files) => {
                mockStartUpload(files, config);
                return Promise.resolve(undefined); // conforme à la signature
            },
            isUploading: false,
            routeConfig: undefined,
        }));
    });

    it("appelle startUpload quand AppFileInput déclenche onSelect", async () => {
        const user = userEvent.setup();

        render(<AppUploader onUpload={mockOnUpload} />);

        await user.click(screen.getByRole("button", { name: "MockFileInput" }));

        expect(mockStartUpload).toHaveBeenCalled();
    });

    it("appelle onUpload avec la bonne URL quand l'upload réussit", async () => {
        mockStartUpload.mockImplementation((_files, config) => {
            config.onClientUploadComplete?.([
                { ufsUrl: "https://example.com/image.png" },
            ]);
        });

        render(<AppUploader onUpload={mockOnUpload} />);

        await userEvent.click(screen.getByRole("button", { name: "MockFileInput" }));

        expect(mockOnUpload).toHaveBeenCalledWith("https://example.com/image.png");
    });

    it("n'appelle pas onUpload si aucun fichier n'est retourné", async () => {
        mockStartUpload.mockImplementation((_files, config) => {
            config.onClientUploadComplete?.([]);
        });

        render(<AppUploader onUpload={mockOnUpload} />);

        await userEvent.click(screen.getByRole("button", { name: "MockFileInput" }));

        expect(mockOnUpload).not.toHaveBeenCalled();
    });

    it("gère les erreurs d'upload sans planter", async () => {
        mockStartUpload.mockImplementation((_files, config) => {
            config.onUploadError?.({ message: "Erreur" });
        });

        render(<AppUploader onUpload={mockOnUpload} />);

        await userEvent.click(screen.getByRole("button", { name: "MockFileInput" }));

        expect(mockOnUpload).not.toHaveBeenCalled();
    });
});